/* eslint-disable react/jsx-props-no-spreading */
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { getDepartments, getDoctorCalendars } from '../Auth/_redux/authService';
import { setDepartments, setDoctorCalendars } from '../Auth/_redux/authAction';
import { setListByDateService } from './_redux/appointmentAction';
import { getListAppointmentByDateService } from './_redux/appointmentService';
import AppointmentDetail from './pages/AppointmentDetail';
import Logout from '../Auth/pages/Logout';

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

const LabelAppointmentDate = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentDepartment = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentStartTime = styled.div`
  padding: 0;
  margin: 0;
`;

const LabelAppointmentEndTime = styled.div`
  padding: 0;
  margin: 0;
`;

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Appointment = () => {
  // const [loading, setLoading] = useState(true);
  const loading = true;
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedValueDepartmentState, setSelectedValueDepartmentState] = useState(0);
  const [selectedNameDepartment, setSelectedNameDepartment] = useState('No service selected');
  const [listShiftDetailsState, setListShiftDetailsState] = useState([
    {
      endTime: '',
      firstName: '',
      id: 0,
      lastName: '',
      startTime: '',
      status: true,
    },
  ]);
  const [startTimeState, setStartTimeState] = useState('08:00');
  const [endTimeState, setEndTimeState] = useState('08:15');
  const [locale] = useState('en');
  const { filterappointmentsby } = useSelector(state => state.appointmentStore);
  const [availability, setAvailability] = useState();
  const { departments } = useSelector(state => state.tokenStore);
  const { doctorcalendars } = useSelector(state => state.tokenStore);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterDoctorCalendarByDay = (departmentsList, doctorCalendarsList) => {
    const itemsFound = [];
    if (departmentsList !== null && doctorCalendarsList !== null) {
      const currentDepartment = departmentsList.find(
        item => item.id === selectedValueDepartmentState,
      );
      const doctorCalendarByDay = doctorCalendarsList.filter(
        item => item.attributes.startDate === appointmentDateState,
      );
      if (typeof (currentDepartment) !== 'undefined' && typeof (doctorCalendarByDay) !== 'undefined') {
        const iteratedepartment = (element, index, array) => {
          const doctorcalendarfounded = doctorCalendarByDay.find(
            x => Number(x.attributes.user_id) === Number(element.id),
          );
          if (doctorcalendarfounded !== undefined) {
            itemsFound.push(doctorcalendarfounded);
          }
        };
        currentDepartment.relationships.doctors.data.forEach(iteratedepartment);
      }
    }
    return itemsFound;
  };
  const getShifts = (departmentsList, doctorCalendarsList) => {
    const currentDateTimeable = filterDoctorCalendarByDay(departmentsList, doctorCalendarsList);
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
  const getShiftDetails = (departmentsList, doctorCalendarsList) => {
    const arrayShiftDetailByHour = [];
    const arrayShiftDetail = getShifts(departmentsList, doctorCalendarsList);
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

  const updateAvailability = (departmentsList, doctorCalendarsList) => {
    const listShiftDetails = getShiftDetails(departmentsList, doctorCalendarsList);
    setListShiftDetailsState(listShiftDetails);
    console.log({ listShiftDetails });
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

  const handleChangeStartTime = event => {
    setStartTimeState(event.target.value);
    console.log({ event });
  };

  const handleChangeEndTime = event => {
    setEndTimeState(event.target.value);
    console.log({ event });
  };

  const handleChange = event => {
    setSelectedValueDepartmentState(event.target.value);
    const currentDepartment = departments.find(
      item => item.id === event.target.value,
    );
    if (typeof (currentDepartment) !== 'undefined') {
      setSelectedNameDepartment(currentDepartment.attributes.name);
    } else {
      setSelectedNameDepartment('Need to select a department');
    }

    const resultAvalilability = updateAvailability(departments, doctorcalendars);
    setAvailability(resultAvalilability);
  };

  const changeAppointmentDate = selectedDate => {
    setAppointmentDateState(moment(selectedDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    getListAppointmentByDateService(selectedValueDepartmentState, appointmentDateState)
      .then(({ data }) => {
        dispatch(setListByDateService(data));
      })
      .catch(error => {
        console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  }, [appointmentDateState, selectedValueDepartmentState]);

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
            autoOkshrink
            orientation="landscape"
            variant="static"
            openTo="date"
            value={appointmentDateState}
            onChange={changeAppointmentDate}
          />
        </MuiPickersUtilsProvider>
        <FormControl>
          <InputLabel shrink htmlFor="age-native-label-placeholder">
            Department
          </InputLabel>
          <NativeSelect
            value={selectedValueDepartmentState}
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
        { loading ? <Logout /> : null }
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            New
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to t
                occasionally.
              </DialogContentText>
              <div className="my-3">
                <FormControl>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Start Time:
                  </InputLabel>
                  <NativeSelect
                    value={startTimeState}
                    onChange={handleChangeStartTime}
                  >
                    <option value="0">Select Department</option>
                    {listShiftDetailsState !== null
                      ? listShiftDetailsState.map(item => (
                        <option value={item.startTime} key={item.id}>{item.startTime}</option>
                      ))
                      : null}
                  </NativeSelect>
                  <FormHelperText>Label + placeholder</FormHelperText>
                </FormControl>
              </div>
              <div className="my-3">
                <FormControl>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Start Time:
                  </InputLabel>
                  <NativeSelect
                    value={endTimeState}
                    onChange={handleChangeEndTime}
                  >
                    <option value="0">Select Department</option>
                    {listShiftDetailsState !== null
                      ? listShiftDetailsState.map(item => (
                        <option value={item.startTime} key={item.id}>{item.endTime}</option>
                      ))
                      : null}
                  </NativeSelect>
                  <FormHelperText>Label + placeholder</FormHelperText>
                </FormControl>
              </div>

              <LabelAppointmentDate className="d-flex flex-row my-3">
                <InputLabel htmlFor="age-native-label-placeholder">
                  Date:
                </InputLabel>

                <InputLabel htmlFor="age-native-label-placeholder">
                  {appointmentDateState}
                </InputLabel>
              </LabelAppointmentDate>
              <LabelAppointmentDepartment className="d-flex flex-row my-3">
                <InputLabel htmlFor="age-native-label-placeholder">
                  Service:
                </InputLabel>
                <InputLabel htmlFor="age-native-label-placeholder">
                  {selectedNameDepartment}
                </InputLabel>
              </LabelAppointmentDepartment>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </LeftSideBar>
      <ContentWrapper className="d-flex flex-column justify-content-center">
        { availability !== null && typeof (availability) !== 'undefined'
          ? availability.map(item => (
            <AppointmentDetail
              key={item.id}
              time={item.startTime}
              endTime={item.endTime}
              status={item.status}
              patient="Mia Maria Fernando Baca Paz"
              service="ODONTOLOGIA BASICA"
              office="Consultorio 105 (Ubicado en el piso 4 modulo 3)"
            />
          ))
          : <h1>no data</h1> }
      </ContentWrapper>
    </AppointmentWrapper>
  );
};

export default Appointment;
