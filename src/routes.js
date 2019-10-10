  
import React from "react";
import { Route, Redirect, Switch } from "react-router";
import App from './App'
import Login from './components/login'
import Home from './components/home'
import Profile from'./components/profile'

const Routes = () => (
  <App>
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile/:profile_id" component={Profile} />
      {/* <Route component={Login} /> */}
    </Switch>
  </App>
);

export default Routes;