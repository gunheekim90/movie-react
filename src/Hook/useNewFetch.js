import { useReducer, useEffect } from "react";
import { popularReducer, popularInitState } from "../Reducer/popularReducer";
import { newReducer, newInitState } from "../Reducer/newReducer";

const useFetch = (callback, deps = [], wait = false) => {
  const [state, dispatch] = useReducer(newReducer, newInitState);

  //fetchData와 refectchData 코드 부분이 New 커스텀 훅과 Popular 커스텀 훅이 유사하다
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      setTimeout(async () => {
        const data = await callback();
        dispatch({ type: "SUCCESS", data });
      }, 1000);
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

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
  }, []);

  return [state, refetchData];
};

export default useFetch;
