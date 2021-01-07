import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import AuthPage from './modules/Auth/AuthPage';
import BasePage from './BasePage';

const Routes = () => {
  const isAuthorized = false;
  return (
    <Switch>
      {!isAuthorized ? (
        <Route>
          <h1>title</h1>
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
