import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import MembershipContainer from "./containers/MembershipsContainer";
import TicketsList from "./components/tickets/TicketsList";
import TicketDetail from "./components/tickets/TicketDetail";
import CreateTicket from "./components/tickets/CreateTicket";
import EditTicket from "./components/tickets/EditTicket";
import AuthRouteCheck from "./utils/AuthRouteCheck";
import Login from "./components/userAuth/Login";
import Signup from "./components/userAuth/Signup";
import Products from "./components/ecommerce/Products";
import CartContainer from "./containers/CartContainer";
import CheckoutForm from "./components/ecommerce/CheckoutForm";
import ArticleList from "./components/blog/ArticleList";
import ArticleDetail from "./components/blog/ArticleDetail";
import UserProfile from "./components/userAuth/UserProfile";

const BaseRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/tickets" component={TicketsList} />
        <Route path="/ticket/:id" component={TicketDetail} />
        <Route path="/pricing" component={MembershipContainer} />
        <Route path="/products" component={Products} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/checkout" component={CheckoutForm} />

        <AuthRouteCheck path="/blog-article-list" component={ArticleList} />
        <AuthRouteCheck path="/blog-article/:id" component={ArticleDetail} />
        <AuthRouteCheck path="/create-ticket" component={CreateTicket} />
        <AuthRouteCheck path="/edit-ticket/:id" component={EditTicket} />
      </Switch>
    </Fragment>
  );
};

export default BaseRouter;
