import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { AuthPage } from './modules/Auth';
// import Login from './modules/Auth/pages/Login';
import BasePage from './BasePage';

const Routes = () => {
  const isAuthorized = false;
  return (
    <Switch>
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from="/auth" to="/" />
      )}
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
