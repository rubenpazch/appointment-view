import React, { lazy, Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

const Appointment = lazy(() => import('./modules/Appointment'));
// const Register = lazy(() => import('./modules/Appointment/Register'));

export default function BasePage() {
  return (
    <Suspense>
      <Switch>
        <Redirect exact from="/" to="/Appointments" />
        <Route path="/Appointments" component={Appointment} />
      </Switch>
    </Suspense>
  );
}
