import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { AuthPage, Logout } from './modules/Auth';
// import Login from './modules/Auth/pages/Login';
import BasePage from './BasePage';

const Routes = () => {
  const { isAuthorized } = useSelector(
    ({ tokenStore }) => ({
      isAuthorized: tokenStore.token !== null,
    }),
    shallowEqual,
  );
  return (
    <Switch>
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
      /* Redirect to `/auth` when user is not authorized */
        <Redirect to="/auth/login" />
      ) : (
        <BasePage />
      )}
    </Switch>
  );
};

export default Routes;
