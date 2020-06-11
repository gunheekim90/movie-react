import React from "react";
import { NavLink } from "react-router-dom";
import MainRouter from "../Router/MainRouter";
import "./Style.css";

const Header = () => {
  const activeStyle = {
    background: "orange",
    borderRadius: "10px",
    padding: "10px",
  };
  return (
    <div className="Header">
      <h1 className="HeaderTitle">패캠 오전 10시의 영화</h1>
      <ul>
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            인기순
          </NavLink>
        </li>
        <li>
          <NavLink to="/New" activeStyle={activeStyle}>
            최신순
          </NavLink>
        </li>
        <li>
          <NavLink to="/Search" activeStyle={activeStyle}>
            영화 검색
          </NavLink>
        </li>
        <li>
          <NavLink to="/About" activeStyle={activeStyle}>
            About
          </NavLink>
        </li>
      </ul>
      <br />
      <div className="HeaderPage">
        <MainRouter />
      </div>
    </div>
  );
};

export default Header;
