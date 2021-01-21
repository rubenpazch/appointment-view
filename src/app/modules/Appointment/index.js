/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/en-in';
import Logout from '../Auth/pages/Logout';
import AppointmentDetail from './pages/AppointmentDetail';

moment.locale('en');

const AppointmentWrapper = styled.div`  
  height: 100vh;
  border: 1px dashed black;
`;

const LeftSideBar = styled.div`  
  width: 35vw;
  border: 1px dashed black;
`;

const ContentWrapper = styled.div`  
  width: 65vw;
  border: 1px dashed black;
`;

const Appointment = () => {
  // const [loading, setLoading] = useState(true);
  const loading = true;
  const [date] = useState(new Date());
  const changeDate = selectedDate => {
    console.log(selectedDate._i);
    console.log({ selectedDate });
  };
  const [locale] = useState('en');
  // const [anchorEl, setAnchorEl] = useState(null);

  // setLocale('es');

  return (
    <AppointmentWrapper className="d-flex flex-row">
      <LeftSideBar>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={date}
            onChange={changeDate}
          />
        </MuiPickersUtilsProvider>
      </LeftSideBar>
      <ContentWrapper className="d-flex flex-column">
        <h1>Today</h1>
        <AppointmentDetail service="cirugia" patient="Carlos Paz" office="Consultorio 1" time="8:00" />
        <AppointmentDetail service="cirugia" patient="Carlos Paz" office="Consultorio 1" time="8:00" />
        { loading ? <Logout /> : null }

      </ContentWrapper>
    </AppointmentWrapper>
  );
};

export default Appointment;
