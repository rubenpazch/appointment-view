/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/en-in';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Logout from '../Auth/pages/Logout';
import AppointmentDetail from './pages/AppointmentDetail';
import { getListAppointmentByDateService } from './_redux/appointmentService';
import { setListByDateService } from './_redux/appointmentAction';
import { setDepartments } from '../Auth/_redux/authAction';
import { getDepartments } from '../Auth/_redux/authService';

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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Appointment = () => {
  // const [loading, setLoading] = useState(true);
  const loading = true;
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [locale] = useState('en');
  const { filterappointmentsby } = useSelector(state => state.appointmentStore);
  const { departments } = useSelector(state => state.tokenStore);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedDepartment, setSelectedDepartment] = React.useState(0);

  const handleChange = event => {
    setSelectedDepartment(event.target.value);
  };

  const changeDate = selectedDate => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    getListAppointmentByDateService(selectedDepartment, date)
      .then(({ data }) => {
        dispatch(setListByDateService(data));
      })
      .catch(error => {
        console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  }, [date, selectedDepartment]);

  useEffect(() => {
    getDepartments()
      .then(({ data }) => {
        dispatch(setDepartments(data));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);
        // setStatus('not working');
      });
  }, []);
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
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="age-native-label-placeholder">
            Age
          </InputLabel>
          <NativeSelect
            value={selectedDepartment}
            onChange={handleChange}
          >
            <option value="0">Select Department</option>
            {departments !== null
              ? departments.map(item => (
                <option value={item.id} key={item.id}>{item.attributes.name}</option>
              ))
              : null}
          </NativeSelect>
          <FormHelperText>Label + placeholder</FormHelperText>
        </FormControl>
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
