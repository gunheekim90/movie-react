import React, { useRef, useEffect, useState } from "react";
import { useGetState, useGetDispatch } from "../Context/movieContext";
import { makeImagePath } from "../Util.js/makeImagePath";
import { Link } from "react-router-dom";
import { movies } from "../api";
import "./Style.css";
const Search = () => {
  //검색페이지에 들어오면 검색결과 항시 제거
  //유지하게 하려면 동일하게 리듀서에서 공통관리!
  const [searchState, setSearchState] = useState([]);
  const state = useGetState();
  const dispatch = useGetDispatch();

  const inputState = state.inputState;
  const movie = searchState;
  const { saveKeyword, changeInput } = dispatch;
  const inputRef = useRef();
  useEffect(() => {
    //컴포넌트에 들어오자마자 포커싱 하려고
    inputRef.current.focus();
  }, []);
  const enterKeyword = async (e) => {
    if (e.keyCode === 13) {
      const keyword = e.target.value;
      saveKeyword(keyword);
      inputRef.current.value = "";
      const tempData = await movies.searchMovies(keyword);
      //로딩 상태를 구현하고 싶으면 reducer를 이용하여 로딩 + 데이터 모두 관리
      await setSearchState(tempData.data.results);
    }
  };
  const changeKeyword = (e) => {
    changeInput(e.target.value);
  };
  const keywords = inputState.keyword === undefined ? [] : inputState.keyword;

  console.log(keywords);
  return (
    <>
      <div className="Search">
        <input
          className="SearchInput"
          type="text"
          ref={inputRef}
          onKeyDown={enterKeyword}
          onChange={changeKeyword}
        />
      </div>
      <p>
        {keywords.length !== 0
          ? keywords.map((k) => {
              return <span className="KeywordTag">{k}</span>;
            })
          : "키워드를 검색해보세요!"}
      </p>
      {movie
        ? movie.map((m, i) => {
            return (
              <Link to={"/Search/" + m.id} key={i}>
                <div className="MovieImage" key={i}>
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
  );
};

export default Search;
