import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";
import { makeImagePath } from "../Util.js/makeImagePath";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetState, useGetDispatch } from "../Context/movieContext";

const Popular = () => {
  const state = useGetState();
  const dispatch = useGetDispatch();

  const { error, loading, movie, page } = state.popularState;
  const refetch = dispatch.popularDispatch;
  const loadFunc = () => refetch(page + 1);
  //5는 임의의 max page -> 실제로는 api 데이터 이용
  const checkMode = () => (page === 5 ? false : true);
  if (error) return "영화를 가져오는데 에러가 발생하였습니다.";
  return (
    <InfiniteScroll
      dataLength={movie.length}
      next={loadFunc}
      hasMore={checkMode()}
      loader={<h4>Loading...</h4>}
      height={700}
    >
      {loading ? (
        <>
          <h1>인기순으로 영화를 가져오는 중입니다...</h1>
          <img
            src="https://media.giphy.com/media/3ofT5SYZUlquxDH6Pm/giphy.gif"
            alt="움짤"
          />
        </>
      ) : (
        <>
          {/* <h1 className="PageHeader">인기순위 페이지</h1> */}
          {movie
            ? movie.map((m, i) => {
                return (
                  <Link to={"/" + m.id} key={i}>
                    <div className="MovieImage">
                      <h3>👍 {m.vote_count}</h3>
                      <p className="MovieTitle">{m.original_title}</p>
                      <img
                        className="MovieImageStyle"
                        src={makeImagePath(m.poster_path, "w200")}
                        alt="영화이미지"
                      />
                    </div>
                  </Link>
                );
              })
            : ""}
        </>
      )}
    </InfiniteScroll>
  );
};

export default Popular;
