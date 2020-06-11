export const popularInitState = {
  loading: false,
  error: false,
  movie: [],
  page: 0,
};

export const popularReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: null,
        movie: state.movie,
        page: state.page,
      };
    case "SUCCESS":
      return {
        loading: false,
        error: null,
        movie: state.movie.concat(action.data.results),
        page: action.page === undefined ? action.data.page : action.page,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error,
        movie: null,
        page: 0,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
