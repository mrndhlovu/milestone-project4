import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Tickets from "./js/components/Tickets";
import Login from "./js/components/Login";
import Signup from "./js/components/Signup";
import Home from "./js/components/home/Home";

const BaseRouter = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/tickets" component={Tickets} />
      {/* <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} /> */}
    </Fragment>
  );
};

export default BaseRouter;
