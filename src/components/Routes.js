import React from 'react';
import { Route } from 'react-router-dom';

import Home from './home/Home'
import About from './about/About'
import Register from './auth/Register'
import Login from './auth/Login'
import ErrorPage from './ErrorPage'


const Routes = () => (
    <div>
        <Route  exact path="/" components={Home}/>
        <Route  path="/about" components={About}/>
        <Route  path="/register" components={Register}/>
        <Route  path="/login" components={Login}/>
        <Route components={ErrorPage}/>
    </div>
)


export default Routes;
