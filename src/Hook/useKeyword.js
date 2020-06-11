import { useReducer, useEffect } from "react";
import { keywordState, keywordReducer } from "../Reducer/keywordReducer";

const useKeyword = () => {
  const [state, dispatch] = useReducer(keywordReducer, keywordState);
  const saveKeyword = () => dispatch({ type: "KEYWORD_SAVE" });
  const changeInput = (keyword) =>
    dispatch({ type: "CHANGE_INPUT", keyword: keyword });
  useEffect(() => {}, []);

  return [state, saveKeyword, changeInput];
};

export default useKeyword;
