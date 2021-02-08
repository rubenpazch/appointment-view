/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import styled from 'styled-components';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  useFormik, Formik, Form, ErrorMessage,
} from 'formik';

import { DisplayFormikState } from './helper';

moment.locale('en');

const DateWrapper = styled.div`    
  padding: 0;
  margin: 15px 0 0 0;

  button {
    height: auto;
    min-width: auto;
    margin: 0;
    padding: 0;
  }
`;
const EndTimeWrapper = styled.div`
  margin: 15px 0 0 0;
`;

const defaultShiftDetail = {
  doctor_id: 0,
  endTime: '00:00',
  firstName: '',
  id: 0,
  lastName: '',
  patient_id: 0,
  startTime: '00:00',
  status: false,
};

const ModalAppointment = ({
  handleSubmitModal,
  handleClose,
  open,
  selectObjectList,
}) => {
  const [startTimeState, setStartTimeState] = useState('');
  const [intervalTimeState, setIntervalTimeState] = useState(defaultShiftDetail);
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = React.useState('');
  const [locale] = useState('en');

  const handleDateChange = e => {
    const newDate = moment(e.target.value).format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  // const [openModal, setOpenModal] = useState(open);
  const handleChangeStartTime = event => {
    setStartTimeState(event.target.value);
    const shiftDetail = selectObjectList.find(
      item => Number(item.id) === Number(event.target.value),
    );
    if (typeof (shiftDetail) !== 'undefined') {
      setIntervalTimeState(shiftDetail);
    } else {
      setIntervalTimeState(defaultShiftDetail);
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Use this form to register a new appointment
            </DialogContentText>
            <Formik
              initialValues={
                {
                  idtime: '',
                  appointmentdate: '',
                }
}
              onSubmit={values => handleSubmitModal(values)}
              validationSchema={
                Yup.object().shape({
                  idtime: Yup.string()
                    .required('Start Time is required'),
                  appointmentdate: Yup.string()
                    .required('Appointment Date Required'),
                })
              }
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column">
                      <FormControl className="my-3">
                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                          Start Time:
                        </InputLabel>
                        <NativeSelect
                          id="idtime"
                          name="idtime"
                          value={values.idtime}
                          onChange={handleChange}
                        >
                          <option value="">Select Start Time</option>
                          {selectObjectList !== null
                            ? selectObjectList.map(item => (
                              <option value={item.id} key={item.id}>{item.startTime}</option>
                            ))
                            : null}
                        </NativeSelect>
                        {errors.idtime && touched.idtime ? <FormHelperText id="component-error-text" error>{errors.idtime}</FormHelperText> : null}

                      </FormControl>

                      <FormControl>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                          End Time:
                        </InputLabel>
                        <NativeSelect
                          value={intervalTimeState.endTime}
                          disabled
                        >
                          <option
                            name="endtime"
                            value={intervalTimeState.endTime}
                          >
                            {intervalTimeState.endTime}
                          </option>
                        </NativeSelect>
                      </FormControl>
                      <FormControl className="my-3">
                        <DateWrapper>
                          <MuiPickersUtilsProvider
                            libInstance={moment}
                            utils={MomentUtils}
                            locale={locale}
                          >
                            <TextField
                              id="appointmentdate"
                              name="appointmentdate"
                              label="Appointment Date"
                              format="MM/DD/yyyy"
                              InputProps={{ inputProps: { min: appointmentDateState } }}
                              type="date"
                              className="m-0 p-0"
                              value={values.appointmentdate}
                              onChange={handleChange}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </DateWrapper>

                        {errors.appointmentdate && touched.appointmentdate ? <FormHelperText id="component-error-text" error>{errors.appointmentdate}</FormHelperText> : null}
                      </FormControl>

                      <DialogActions>
                        <Button onClick={handleClose} className="outline">
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          className="outline"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                        {/* <DisplayFormikState {...props} /> */}
                      </DialogActions>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAppointment;
