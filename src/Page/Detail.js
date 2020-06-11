import React, { useEffect, useState } from "react";
import "./Style.css";
import { useParams, useHistory } from "react-router-dom";
import { movies } from "../api";
import { makeImagePath } from "../Util.js/makeImagePath";
const Detail = () => {
  const [detailState, detailSetState] = useState({});
  const history = useHistory();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const getDetail = async (p) => {
      const result = await movies.getMovie(p.idx);
      await detailSetState(result.data);
    };
    getDetail(params);
  }, []);
  console.log(detailState);
  return (
    <div>
      <div className="DetailLeft">
        {" "}
        <img
          className="MovieImageStyle"
          src={makeImagePath(detailState.poster_path, "w300")}
          alt="영화이미지"
        />
      </div>
      <div className="DetailRight">
        <h1>{detailState.original_title}</h1>
        <p className="DetailTag">
          {detailState.genres
            ? detailState.genres.map((k) => {
                return <span className="KeywordTag">{k.name}</span>;
              })
            : ""}
        </p>
        <p>{detailState.overview}</p>
        <p>개봉일 {detailState.release_date}</p>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default Detail;
