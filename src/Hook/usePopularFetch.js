import { useReducer, useEffect, useCallback, useRef } from "react";
import { popularReducer, popularInitState } from "../Reducer/popularReducer";
import { newReducer, newInitState } from "../Reducer/newReducer";

/*
useCallback()의 Memoization에 영향을 미치는 useState()의 state와 setState()는 하나의 useCallback()에서 동시에 사용하지 않는다는 원칙을 가질 필요가 있다.

useCallback() 내에서 state를 간접적으로 사용하는 방법들을 알아두면 도움이 된다.
*/

const useFetch = (callback, deps = [], wait = false) => {
  const [state, dispatch] = useReducer(popularReducer, popularInitState);
  //
  const stateRef = useRef(state);
  const fetchData = useCallback(async () => {
    //useEffect는 항상 마운트된 다음의 상태값
    //리렌더링 된다음에는 그 전의 상태값들을 가지고 비교 한후 componentDidUpdate를 할지 말지 결정하기때문에
    //매 렌더링마타 다시 초기화되고 데이터 페치 후 없데이트되는 로딩 상태때문에 무한루프에 빠진다.
    //상태값을 주시하고 있다가 변경시점에 동작하게 하려면
    //현재 상태값을 참조하는 ref를 이용해야한다 근데 굳이?
    dispatch({ type: "LOADING" });
    try {
      setTimeout(async () => {
        const data = await callback();
        //api~
        dispatch({ type: "SUCCESS", data });
      }, 1000);
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  }, [stateRef]);

  const refetchData = async (page) => {
    // dispatch({ type: "LOADING" });
    try {
      setTimeout(async () => {
        const data = await callback(page);
        dispatch({ type: "SUCCESS", data, page });
      }, 500);
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (wait) return;
    fetchData();
  }, [fetchData]);

  return [state, refetchData];
};

export default useFetch;
