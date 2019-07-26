import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./components/Products";
import Home from "./components/home/Home";
import Pricing from "./components/Pricing";
import TicketsList from "./components/tickets/TicketsList";
import TicketDetail from "./components/tickets/TicketDetail";
import CreateTicket from "./components/tickets/CreateTicket";

const BaseRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tickets" component={TicketsList} />
        <Route path="/ticket/:id" component={TicketDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/products" component={Products} />
        <Route path="/create-ticket" component={CreateTicket} />
      </Switch>
    </Fragment>
  );
};

export default BaseRouter;
