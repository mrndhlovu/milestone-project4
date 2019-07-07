import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Tickets from "./js/components/Tickets";
import Login from "./js/components/Login";
import Signup from "./js/components/Signup";

const BaseRouter = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/tickets" component={Tickets} />
      {/* <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} /> */}
    </div>
  );
};

export default BaseRouter;
