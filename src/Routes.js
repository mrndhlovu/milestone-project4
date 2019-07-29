import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Products from "./components/ecommerce/Products";
import Home from "./components/home/Home";
import Pricing from "./components/ecommerce/Pricing";
import TicketsList from "./components/tickets/TicketsList";
import TicketDetail from "./components/tickets/TicketDetail";
import CreateTicket from "./components/tickets/CreateTicket";
import AuthRouteCheck from "./utils/AuthRouteCheck";
import Login from "./components/userAuth/Login";
import Signup from "./components/userAuth/Signup";

const BaseRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/tickets" component={TicketsList} />
        <Route path="/ticket/:id" component={TicketDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/products" component={Products} />

        <AuthRouteCheck path="/create-ticket" component={CreateTicket} />
      </Switch>
    </Fragment>
  );
};

export default BaseRouter;
