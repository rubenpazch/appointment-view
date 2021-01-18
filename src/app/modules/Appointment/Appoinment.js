import React from 'react';
import Logout from '../Auth/pages/Logout';
// import { Redirect, Switch } from 'react-router-dom';
const Appointment = () => {
  console.log('in component');
  return (
    <>
      <div>
        <h2>testing</h2>
        <h1>you are in appointment</h1>
        <Logout />
      </div>
    </>
  );
};

export default Appointment;
