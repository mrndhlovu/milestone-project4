import React from "react";
import { Route, Switch } from "react-router-dom";

import ArticleDetail from "./components/blog/ArticleDetail";
import ArticleList from "./components/blog/ArticleList";
import AuthRouteCheck from "./utils/AuthRouteCheck";
import CartContainer from "./containers/CartContainer";
import CheckoutForm from "./components/ecommerce/CheckoutForm";
import CreateTicketContainer from "./containers/CreateTicketContainer";
import DashboardContainer from "./containers/DashboardContainer";
import EditTicket from "./components/tickets/EditTicket";
import Home from "./components/home/Home";
import LoginContainer from "./containers/LoginContainer";
import MembershipContainer from "./containers/MembershipsContainer";
import SignupContainer from "./containers/SignupContainer";
import TicketDetailContainer from "./containers/TicketDetailContainer";
import TicketsListContainer from "./containers/TicketsListContainer";
import UserProfileContainer from "./containers/UserProfileContainer";

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/tickets" component={TicketsListContainer} />
      <Route path="/ticket/:id" component={TicketDetailContainer} />
      <Route path="/pricing" component={MembershipContainer} />
      <Route path="/dashboard" component={DashboardContainer} />
      <Route path="/user-profile" component={UserProfileContainer} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/checkout" component={CheckoutForm} />

      <AuthRouteCheck path="/blog-article-list" component={ArticleList} />
      <AuthRouteCheck path="/blog-article/:id" component={ArticleDetail} />
      <AuthRouteCheck path="/create-ticket" component={CreateTicketContainer} />
      <AuthRouteCheck path="/edit-ticket/:id" component={EditTicket} />
    </Switch>
  );
};

export default BaseRouter;
