import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/home/Home'
import About from '../components/about/About'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import ErrorPage from '../components/ErrorPage'


const Routes = () => (

    <Switch>
        <Route  exact path="/" components={Home}/>
        <Route  path="/about" components={About}/>
        <Route  path="/register" components={Register}/>
        <Route  path="/login" components={Login}/>
        <Route components={ErrorPage}/>
    </Switch>

)


export default Routes;
