import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import MembershipContainer from "./containers/MembershipsContainer";
import TicketsList from "./components/tickets/TicketsList";
import TicketDetailContainer from "./containers/TicketDetailContainer";
import CreateTicket from "./components/tickets/CreateTicket";
import EditTicket from "./components/tickets/EditTicket";
import AuthRouteCheck from "./utils/AuthRouteCheck";
import LoginContainer from "./containers/LoginContainer";
import SignupContainer from "./containers/SignupContainer";
import Products from "./components/ecommerce/Products";
import CartContainer from "./containers/CartContainer";
import CheckoutForm from "./components/ecommerce/CheckoutForm";
import ArticleList from "./components/blog/ArticleList";
import ArticleDetail from "./components/blog/ArticleDetail";
import UserProfileContainer from "./containers/UserProfileContainer";

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/tickets" component={TicketsList} />
      <Route path="/ticket/:id" component={TicketDetailContainer} />
      <Route path="/pricing" component={MembershipContainer} />
      <Route path="/products" component={Products} />
      <Route path="/user-profile" component={UserProfileContainer} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/checkout" component={CheckoutForm} />

      <AuthRouteCheck path="/blog-article-list" component={ArticleList} />
      <AuthRouteCheck path="/blog-article/:id" component={ArticleDetail} />
      <AuthRouteCheck path="/create-ticket" component={CreateTicket} />
      <AuthRouteCheck path="/edit-ticket/:id" component={EditTicket} />
    </Switch>
  );
};

export default BaseRouter;
