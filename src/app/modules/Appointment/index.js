/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/en-in';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import Logout from '../Auth/pages/Logout';
// eslint-disable-next-line no-unused-vars
import AppointmentDetail from './pages/AppointmentDetail';
// eslint-disable-next-line no-unused-vars
import { getListAppointmentByDateService } from './_redux/appointmentService';
import { setListByDateService } from './_redux/appointmentAction';
// import { appointmentReducer } from './_redux/appointmentReducer';

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
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [locale] = useState('en');
  const { filterappointmentsby } = useSelector(state => state.appointmentStore);
  const dispatch = useDispatch();

  const changeDate = selectedDate => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
  };
  useEffect(() => {
    getListAppointmentByDateService('66', date)
      .then(({ data }) => {
        dispatch(setListByDateService(data));
      })
      .catch(error => {
        console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  }, [date]);

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
        { filterappointmentsby !== null && filterappointmentsby.length > 0
          ? filterappointmentsby.map(item => (
            <AppointmentDetail
              key={item.id}
              time={moment.utc(item.attributes.startTime).format('HH:mm')}
              patient="patient x"
              service="service z"
              office="office s"
            />
          ))
          : <h1>no data</h1> }
        { loading ? <Logout /> : null }
      </ContentWrapper>
    </AppointmentWrapper>
  );
};

export default Appointment;
