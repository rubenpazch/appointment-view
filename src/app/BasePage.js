// eslint-disable react-hooks/exhaustive-deps
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  lazy, Suspense, useEffect, useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import {
  getDoctorCalendars,
} from './modules/Auth/_redux/authService';

import {
  setDoctorCalendars,
  setDoctors,
  setDoctorsUsers,
} from './modules/Auth/_redux/authAction';
import { ToastContext } from '../components/ToastContextProvider';

const Appointment = lazy(() => import('./modules/Appointment'));
const Dashboard = lazy(() => import('./modules/Dashboard'));

export default function BasePage() {
  const dispatch = useDispatch();
  const { notifyError } = useContext(ToastContext);
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
        dispatch(setDoctorCalendars(data));
        dispatch(setDoctors(arrayOfDoctors));
        dispatch(setDoctorsUsers(arrayOfUsersDoctors));
      }).catch(error => {
        notifyError(error.message);
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
