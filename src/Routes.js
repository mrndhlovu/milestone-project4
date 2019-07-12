import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Tickets from "./components/tickets/TicketsList";
import Signup from "./components/userAuth/SignupModal";
import Login from "./components/userAuth/LoginModal";

import Home from "./components/Home";

const BaseRouter = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />

      <Route path="/tickets" component={Tickets} />

      {/* <Route path="/pricing" component={Pricing} /> */}
    </Fragment>
  );
};

export default BaseRouter;
