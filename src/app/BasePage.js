import React, { lazy, Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

const Appointment = lazy(() => import('./modules/Appointment'));
const Dashboard = lazy(() => import('./modules/Dashboard'));
// const Register = lazy(() => import('./modules/Appointment/Register'));

export default function BasePage() {
  return (
    <Suspense>
      <Switch>
        <Redirect exact from="/" to="/Dashboard" />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Appointments" component={Appointment} />
      </Switch>
    </Suspense>
  );
}
