export const keywordState = {
  input: "",
  keyword: [],
};

export const keywordReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        input: action.keyword,
        keyword: state.keyword,
      };
    case "KEYWORD_SAVE":
      return {
        input: keywordState.input,
        keyword: state.keyword.concat(state.input),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
