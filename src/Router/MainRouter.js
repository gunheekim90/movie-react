import React from "react";
import { Route, Switch } from "react-router-dom";
import Popular from "../Page/Popular";
import Search from "../Page/Search";
import New from "../Page/New";
import About from "../Page/About";
import Detail from "../Page/Detail";
import SubRouter from "./SubRouter";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/About" component={About} />
      <Route exact path="/New" component={New} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/:idx" component={Detail} />
      {/* <Route path="/New/:idx" component={Detail} />
      <Route path="/Search/:idx" component={Detail} /> */}
      <SubRouter />
      {/* 
        라우터가 화면을 보여주는 역할을 하므로, 인기 순위 영화 페이지 하단에 위치 할게 아니라 갈아치우려면 서브라우터는 동일한 라우터에 존재해야 함
      */}
    </Switch>
  );
};

export default MainRouter;
