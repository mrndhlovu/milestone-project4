import React from "react";

import { Route, Switch } from "react-router-dom";
import ArticleDetail from "./components/blog/ArticleDetail";
import ArticleList from "./components/blog/ArticleList";
import AuthRouteCheck from "./utils/AuthRouteCheck";
import CheckoutContainer from "./containers/CheckoutContainer";
import CreateTicketContainer from "./containers/CreateTicketContainer";
import DashboardContainer from "./containers/DashboardContainer";
import EditTicketContainer from "./containers/EditTicketContainer";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import MembershipContainer from "./containers/MembershipsContainer";
import SignupContainer from "./containers/SignupContainer";
import TicketDetailContainer from "./containers/TicketDetailContainer";
import TicketsListContainer from "./containers/TicketsListContainer";
import UserProfileContainer from "./containers/UserProfileContainer";

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/tickets" component={TicketsListContainer} />
      <Route path="/ticket/:id" component={TicketDetailContainer} />
      <Route path="/pricing" component={MembershipContainer} />
      <Route path="/dashboard" component={DashboardContainer} />
      <Route path="/user-profile" component={UserProfileContainer} />

      <AuthRouteCheck path="/checkout" component={CheckoutContainer} />
      <AuthRouteCheck path="/blog-article-list" component={ArticleList} />
      <AuthRouteCheck path="/blog-article/:id" component={ArticleDetail} />
      <AuthRouteCheck path="/create-ticket" component={CreateTicketContainer} />
      <AuthRouteCheck path="/edit-ticket/:id" component={EditTicketContainer} />
    </Switch>
  );
};

export default BaseRouter;
