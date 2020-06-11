/*

    이 코드는 newReducer와 popularReducer를 다음과 같이
    리팩토링 하여 코드의 중복을 줄일 수 있다는 것을 보여줄 뿐
    실제 로직에서는 사용하지 않았습니다. 참고!

*/

import { useReducer, useEffect } from "react";
import { fetchInitState, fetchReducerHandler } from "../Reducer/fetchReducer";

const useFetch = (callback, deps = [], wait = false, type) => {
  /*
        기존에 사용했던 커스텀 훅에 type이란 인자를 하나 더 넘겨줘서 
        우리가 방금 만들었던 기존 리듀서들을 리팩토링하여 하나로 합쳤던 fetchReducer로 type을 보냅니다.

        해당 타입에 맞는 리듀서로 세팅이 되면서, 
        타입에 맞는 디스패치 호출시 상태변경이 이루어집니다.

        그럼 커스텀 훅 사용 모습을 보기위해
        /Context/movieContext.js로 ㄱㄱ
    */

  const [state, dispatch] = useReducer(
    fetchReducerHandler(type),
    fetchInitState
  );
  const SUCCESS = `${type}_SUCCESS`;
  const LOADING = `${type}_LOADING`;
  const ERROR = `${type}_ERROR`;

  //fetchData와 refectchData 코드 부분이 New 커스텀 훅과 Popular 커스텀 훅이 유사하다

  //그나저나 fechData와 refetchData도 중복코드가 보이는데 리팩토링 할 수 있을 것 같다!(해보기)
  const fetchData = async () => {
    dispatch({ type: LOADING });
    try {
      setTimeout(async () => {
        const data = await callback();
        dispatch({ type: SUCCESS, data });
      }, 1000);
    } catch (e) {
      dispatch({ type: ERROR, error: e });
    }
  };

  const refetchData = async (page) => {
    // dispatch({ type: "LOADING" });
    try {
      setTimeout(async () => {
        const data = await callback(page);
        dispatch({ type: SUCCESS, data, page });
      }, 500);
    } catch (e) {
      dispatch({ type: ERROR, error: e });
    }
  };

  useEffect(() => {
    if (wait) return;
    fetchData();
  }, []);

  return [state, refetchData];
};

export default useFetch;
