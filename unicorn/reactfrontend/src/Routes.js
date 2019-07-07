import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Tickets from "./js/components/tickets/Tickets";
import Signup from "./js/components/auth/SignupModal";
import Home from "./js/components/home/Home";

const BaseRouter = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/tickets" component={Tickets} />
      {/* <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} /> */}
    </Fragment>
  );
};

export default BaseRouter;
