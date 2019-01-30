import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../Header';
import PrivateRoute from '../PrivateRoute';
import LoginPage from '../LoginPage';
import MapPage from '../MapPage';

const Layout = () => (
  <>
    <Header />
    <main>
      <Switch>
        <Redirect from="/" exact to="/login" />
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute path="/map" exact component={MapPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </>
);

export default Layout;
