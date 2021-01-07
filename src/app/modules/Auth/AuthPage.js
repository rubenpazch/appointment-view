import React from 'react';
import { Switch } from 'react-router-dom';
import Login from './Login';
import ContentRoute from '../../../layout/components/ContentRoute';

const AuthPage = () => (
  <>
    <h1>title</h1>
    <Switch>
      <ContentRoute path="/auth/login" component={Login} />
    </Switch>
  </>
);

export default AuthPage;
