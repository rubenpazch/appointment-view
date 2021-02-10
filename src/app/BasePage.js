import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
// const Register = lazy(() => import('./modules/Appointment/Register'));
import {
  getDoctorCalendars,
} from './modules/Auth/_redux/authService';

import {
  setDoctorCalendars,
  setDoctors,
  setDoctorsUsers,
} from './modules/Auth/_redux/authAction';

const Appointment = lazy(() => import('./modules/Appointment'));
const Dashboard = lazy(() => import('./modules/Dashboard'));

export default function BasePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    getDoctorCalendars()
      .then(({ data }) => {
        const includedList = data.included;
        const arrayOfDoctors = [];
        const arrayOfUsersDoctors = [];
        for (let indexIL = 0; indexIL < includedList.length; indexIL += 1) {
          if (includedList[indexIL].type === 'person') {
            arrayOfDoctors.push(includedList[indexIL]);
          }
          if (includedList[indexIL].type === 'user') {
            arrayOfUsersDoctors.push(includedList[indexIL]);
          }
        }
        console.log({ arrayOfUsersDoctors });
        dispatch(setDoctorCalendars(data));
        dispatch(setDoctors(arrayOfDoctors));
        dispatch(setDoctorsUsers(arrayOfUsersDoctors));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);doctorcalendars
        // setStatus('not working');
      });
  }, []);

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
