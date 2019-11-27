import React from "react";
import { Route, Switch } from "react-router-dom";

import ArticleDetailContainer from "./containers/ArticleDetailContainer";
import ProtectedRoute from "./utils/ProtectedRoute";
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

      <ProtectedRoute path="/user-profile" component={UserProfileContainer} />
      <ProtectedRoute path="/checkout" component={CheckoutContainer} />
      <ProtectedRoute path="/blog" component={BlogContainer} />
      <ProtectedRoute path="/article/:id" component={ArticleDetailContainer} />
      <ProtectedRoute path="/create-ticket" component={CreateTicketContainer} />
      <ProtectedRoute path="/new-article" component={CreateArticleContainer} />
      <ProtectedRoute path="/edit-ticket/:id" component={EditTicketContainer} />
      <ProtectedRoute
        path="/edit-article/:id"
        component={EditArticleContainer}
      />
    </Switch>
  );
};

export default BaseRouter;
