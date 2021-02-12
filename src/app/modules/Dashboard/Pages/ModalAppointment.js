/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import styled from 'styled-components';
import { Formik } from 'formik';

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

function disableWeekends(date) {
  const dateBefore = moment(date).format('dddd');
  return dateBefore === 'Saturday' || dateBefore === 'Sunday';
}

const ModalAppointment = ({
  handleSubmitModal,
  handleClose,
  open,
  selectObjectList,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).add(1, 'days').format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).add(1, 'days'));
  const handleChangeDatePicker = event => {
    setSelectedDate(moment(event).format('YYYY-MM-DD'));
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
              onSubmit={values => handleSubmitModal(values, selectedDate)}
              validationSchema={
                Yup.object().shape({
                  idtime: Yup.string()
                    .required('Start Time is required'),
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
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column">
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">Start Time</InputLabel>
                        <Select
                          id="idtime"
                          name="idtime"
                          onChange={handleChange}
                          value={values.idtime}
                        >
                          <MenuItem value="">Select Start Time</MenuItem>
                          {selectObjectList !== null
                            ? selectObjectList.map(item => (
                              <MenuItem value={item.id} key={item.id}>{item.startTime}</MenuItem>
                            ))
                            : null}
                        </Select>
                        {errors.idtime && touched.idtime ? <FormHelperText id="component-error-text" error>{errors.idtime}</FormHelperText> : null}
                      </FormControl>
                      <FormControl className="my-3">
                        <DateWrapper>
                          <KeyboardDatePicker
                            disableToolbar
                            minDate={appointmentDateState}
                            shouldDisableDate={disableWeekends}
                            variant="inline"
                            format="MM/DD/yyyy"
                            margin="normal"
                            id="appointmentdate"
                            name="appointmentdate"
                            label="Appointment Date"
                            value={selectedDate}
                            onChange={handleChangeDatePicker}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            className="m-0 p-0"
                          />
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

ModalAppointment.propTypes = {
  handleSubmitModal: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.any,
  selectObjectList: PropTypes.any,
  values: PropTypes.object,
  touched: PropTypes.bool,
  errors: PropTypes.object,
  dirty: PropTypes.any,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.any,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,

};

ModalAppointment.defaultProps = {
  handleSubmitModal: () => {},
  handleClose: () => {},
  open: true,
  selectObjectList: null,
  values: null,
  touched: false,
  errors: null,
  dirty: false,
  isSubmitting: false,
  handleChange: '',
  handleSubmit: () => {},
  handleReset: () => {},
};

export default ModalAppointment;
