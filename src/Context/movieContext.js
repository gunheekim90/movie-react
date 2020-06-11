// eslint-disable-next-line react-hooks/rules-of-hooks

import React, { createContext, useContext } from "react";
import usePopularFetch from "../Hook/usePopularFetch";
import useNewFetch from "../Hook/useNewFetch";
import useKeyword from "../Hook/useKeyword";
import useFetch from "../Hook/useFetch";
import { movies } from "../api";

const MovieState = createContext(null);
const MovieDispatch = createContext(null);

export function MovieProvider({ children }) {
  /*  

    실제로 적용된 코드는 아니고 리듀서와 커스텀 훅 리팩토링 코드의 연장선으로
    리팩토링한 커스텀 훅을 컨텍스트에서 어떻게 가지고 와서 사용하나 기입한 코드입니다.

    이렇게 리듀서 커스텀훅을 조금 리팩토링 하여 각 인자값으로 어떤 리듀서를 세팅하는지 명시가 가능해집니다.

    const [pstate, pRefetch] = useFetch(movies.getPopular, [], false, "POPULAR");
    const [nstate, nRefetch] = useFetch(movies.getUpcoming, [], true, "NEW");

  */

  const [pstate, pRefetch] = usePopularFetch(movies.getPopular, [], false);
  const [nstate, nRefetch] = useNewFetch(movies.getUpcoming, [], true);
  const [inputState, saveKeyword, changeInput] = useKeyword();
  const state = {
    popularState: pstate,
    newState: nstate,
    inputState: inputState,
  };
  const dispatch = {
    popularDispatch: pRefetch,
    newDispatch: nRefetch,
    saveKeyword: saveKeyword,
    changeInput: changeInput,
  };
  return (
    <MovieState.Provider value={state}>
      <MovieDispatch.Provider value={dispatch}>
        {children}
      </MovieDispatch.Provider>
    </MovieState.Provider>
  );
}

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useGetState() {
  const state = useContext(MovieState);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useGetDispatch() {
  const dispatch = useContext(MovieDispatch);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}
