/*

    이 코드는 newReducer와 popularReducer를 다음과 같이
    리팩토링 하여 코드의 중복을 줄일 수 있다는 것을 보여줄 뿐
    실제 로직에서는 사용하지 않았습니다. 참고!

*/

export const fetchInitState = {
  loading: false,
  error: false,
  movie: [],
  page: 0,
};

export const fetchReducerHandler = (type) => {
  /*
        type엔 어떤 값이 넘겨져 올까요?
        => 여기선 최신 영화를 NEW로 표기했지만 여러분들 코드 기준으로는 UPCOMING 또는 POPULAR가 넘어옵니다.
        그럴 경우 하단의 리듀서에선 데이터, 로딩, 에러 각 상태 변경에 대한 디스패치 이름은

        UPCOMING의 경우 UPCOMING_SUCCESS, UPCOMING_LADING, UPCOMING_ERROR;

        이런식으로 변경되어 각 리듀서 분기를 타게 됩니다. 그럼 커스텀 훅도 이를 이용해 리팩토링 가능하겠네요!
        -> /Hook/useFetch 로 ㄱㄱ

    */
  const SUCCESS = `${type}_SUCCESS`;
  const LOADING = `${type}_LOADING`;
  const ERROR = `${type}_ERROR`;

  const newReducer = (state, action) => {
    switch (action.type) {
      case LOADING:
        return {
          loading: true,
          error: null,
          movie: state.movie,
          page: state.page,
        };
      case SUCCESS:
        return {
          loading: false,
          error: null,
          movie: state.movie.concat(action.data.results),
          page: action.page === undefined ? action.data.page : action.page,
        };
      case ERROR:
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
  return newReducer;
};
