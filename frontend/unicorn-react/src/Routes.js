import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Tickets from "./components/tickets/TicketsList";
import Signup from "./components/userAuth/Signup";
import Login from "./components/userAuth/Login";

import Home from "./components/Home";

const BaseRouter = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/tickets" component={Tickets} />
      <Route path="/login" component={Login} />
      {/* <Route path="/pricing" component={Pricing} /> */}
    </Fragment>
  );
};

export default BaseRouter;
