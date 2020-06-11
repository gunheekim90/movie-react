import React from "react";
import { Route, Switch } from "react-router-dom";
import Detail from "../Page/Detail";

const SubRouter = () => {
  return (
    <Switch>
      <Route exact path="/:idx" component={Detail} />
      <Route path="/New/:idx" component={Detail} />
      <Route path="/Search/:idx" component={Detail} />
    </Switch>
  );
};

export default SubRouter;
