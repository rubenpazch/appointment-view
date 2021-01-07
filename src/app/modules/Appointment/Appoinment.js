import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

export default function Appoinment() {
  return (
    <>
      <h1>you are in appointment</h1>
      <Switch>
        <Redirect
          exact
          from="/home"
          to="/appointment"
        />
      </Switch>
    </>
  );
}
