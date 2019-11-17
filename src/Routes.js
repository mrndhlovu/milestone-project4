import React from "react";
import { Route, Switch } from "react-router-dom";

import ArticleDetailContainer from "./containers/ArticleDetailContainer";
import AuthRouteCheck from "./utils/AuthRouteCheck";
import CheckoutContainer from "./containers/CheckoutContainer";
import CreateTicketContainer from "./containers/CreateTicketContainer";
import DashboardContainer from "./containers/DashboardContainer";
import EditTicketContainer from "./containers/EditTicketContainer";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import PricingContainer from "./containers/PricingContainer";
import SignupContainer from "./containers/SignupContainer";
import TicketDetailContainer from "./containers/TicketDetailContainer";
import TicketsListContainer from "./containers/TicketsListContainer";
import UserProfileContainer from "./containers/UserProfileContainer";
import BlogContainer from "./containers/BlogContainer";
import CreateArticleContainer from "./containers/CreateArticleContainer";
import EditArticleContainer from "./containers/EditArticleContainer";

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route exact path="/home" component={HomeContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/tickets" component={TicketsListContainer} />
      <Route path="/ticket/:id" component={TicketDetailContainer} />
      <Route path="/pricing" component={PricingContainer} />
      <Route path="/dashboard" component={DashboardContainer} />
      <Route path="/user-profile" component={UserProfileContainer} />

      <AuthRouteCheck path="/checkout" component={CheckoutContainer} />
      <Route path="/blog" component={BlogContainer} />
      <AuthRouteCheck path="/article/:id" component={ArticleDetailContainer} />
      <AuthRouteCheck path="/create-ticket" component={CreateTicketContainer} />
      <AuthRouteCheck path="/new-article" component={CreateArticleContainer} />
      <AuthRouteCheck path="/edit-ticket/:id" component={EditTicketContainer} />
      <AuthRouteCheck
        path="/edit-article/:id"
        component={EditArticleContainer}
      />
    </Switch>
  );
};

export default BaseRouter;
