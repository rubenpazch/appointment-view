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
import { setDepartments, setDoctorCalendars } from '../Auth/_redux/authAction';
import { getDepartments, getDoctorCalendars } from '../Auth/_redux/authService';

moment.locale('en');

const AppointmentWrapper = styled.div`  
  width: 100%;
`;

const LeftSideBar = styled.div`
  width: 30%;
`;

const ContentWrapper = styled.div`
  width: 65%;
  padding: 15px 0 0 15px;
  margin: 0;
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
  const [availability, setAvailability] = useState();
  const { departments } = useSelector(state => state.tokenStore);
  const { doctorcalendars } = useSelector(state => state.tokenStore);
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(filterappointmentsby);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const filterDoctorCalendarByDay = (departments, doctorCalendars) => {
    const itemsFound = [];
    if (departments !== null && doctorCalendars !== null) {
      const currentDepartment = departments.find(
        item => item.id === selectedDepartment,
      );
      const doctorCalendarByDay = doctorcalendars.filter(
        item => item.attributes.startDate === date,
      );
      if (typeof (currentDepartment) !== 'undefined' && typeof (doctorCalendarByDay) !== 'undefined') {
        const iteratedepartment = (element, index, array) => {
          itemsFound.push(doctorCalendarByDay.find(
            x => Number(x.attributes.user_id) === Number(element.id),
          ));
        };
        currentDepartment.relationships.doctors.data.forEach(iteratedepartment);
      }
    }
    return itemsFound;
  };

  const getShifts = () => {
    const currentDateTimeable = filterDoctorCalendarByDay(departments, doctorcalendars);
    const arrayHours = [];
    if (currentDateTimeable !== null) {
      const iteratedoctorcalendars = (element, index, array) => {
        const obj = {
          startTime: moment.utc(element.attributes.startTime),
          totalHours: element.attributes.totalHours,
          shiftinterval: element.attributes.shiftinterval,
          totalShift: ((
            Number(element.attributes.totalHours) * 60)
            / (Number(element.attributes.shiftinterval))),
        };
        arrayHours.push(obj);
      };
      currentDateTimeable.forEach(iteratedoctorcalendars);
    }
    return arrayHours;
  };

  const getShiftDetails = () => {
    const arrayShiftDetailByHour = [];
    const arrayShiftDetail = getShifts();
    let indexKey = 1;
    const iterateShiftDetail = (element, index, array) => {
      const r = 0;
      let nextStartTime = moment.utc(element.startTime);
      // eslint-disable-next-line no-plusplus
      for (let r = 0; r < element.totalShift; r++) {
        const obj = {
          id: indexKey,
          startTime: moment.utc(nextStartTime).format('HH:mm'),
          endTime: moment.utc(nextStartTime).add(15, 'minutes').format('HH:mm'),
          status: false,
          firstName: '',
          lastName: '',
        };
        arrayShiftDetailByHour.push(obj);
        nextStartTime = moment.utc(nextStartTime).add(15, 'minutes');
        indexKey += 1;
      }
    };
    arrayShiftDetail.forEach(iterateShiftDetail);
    return arrayShiftDetailByHour;
  };

  const updateAvailability = () => {
    const listShiftDetails = getShiftDetails();
    const iterateFilterappointmentsby = (element, index, array) => {
      const startTimeAppointment = moment.utc(element.attributes.startTime).format('HH:mm');
      const endTimeAppointment = moment.utc(element.attributes.startTime).format('HH:mm');
      const foundIndex = listShiftDetails.findIndex(x => x.startTime === startTimeAppointment);
      if (foundIndex !== -1) {
        listShiftDetails[foundIndex].status = true;
      }
    };
    filterappointmentsby.forEach(iterateFilterappointmentsby);
    return listShiftDetails;
  };

  const handleChange = event => {
    setSelectedDepartment(event.target.value);
    const resultAvalilability = updateAvailability();
    setAvailability(resultAvalilability);
  };

  const changeDate = selectedDate => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
  };
  // console.log(doctorcalendars);
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

  useEffect(() => {
    getDoctorCalendars()
      .then(({ data }) => {
        dispatch(setDoctorCalendars(data));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);doctorcalendars
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
      <ContentWrapper className="d-flex flex-column justify-content-center">
        { availability !== null && typeof (availability) !== 'undefined'
          ? availability.map(item => (
            <AppointmentDetail
              key={item.id}
              time={item.startTime}
              endTime={item.endTime}
              patient="Mia Maria Fernando Baca Paz"
              service="ODONTOLOGIA BASICA"
              office="Consultorio 105 (Ubicado en el piso 4 modulo 3)"
            />
          ))
          : <h1>no data</h1> }
        { loading ? <Logout /> : null }
      </ContentWrapper>
    </AppointmentWrapper>
  );
};

export default Appointment;
