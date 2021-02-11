import React, { useState, useEffect, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  setPatientInformation,
} from '../_redux/authAction';
import { registerPeople, registerUser } from '../_redux/authService';
import { ToastContext } from '../../../../components/ToastContextProvider';

const WrapperField = styled.div` 
  padding: 5px;
`;

const WrapperLogin = styled.div`  
  min-width: 70vw;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width:100%;
  max-width: 200px;
`;

const TitleSection = styled.div`
  padding: 15px 0 0 0;
  margin: 0;
  width:100%;
  max-width: 600px;
  h3 {
    font-size: 1.2rem;
  }
`;

const PatientInformation = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { patientRole, patientDepartment } = useSelector(state => state.tokenStore);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(false);
    return () => setLoading(false);
  }, []);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    lastname: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    documentid: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    phone: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    historynumber: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    email: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    username: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('this field is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      documentid: '',
      phone: '',
      historynumber: '',
      email: '',
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      enableLoading();
      setTimeout(() => {
        registerPeople(
          values.firstname,
          values.lastname,
          values.documentid,
          values.phone,
          values.historynumber,
        )
          .then(({
            data: {
              data: {
                attributes: {
                  firstName, lastName, documentId, phone, historyNumber,
                },
                id,
              },
            },
          }) => {
            dispatch(
              setPatientInformation({
                firstName, lastName, documentId, phone, historyNumber, id,
              }),
            );
            registerUser(
              values.email,
              values.username,
              values.password,
              id,
              patientRole[0].id,
              patientDepartment[0].id,
            )

              // eslint-disable-next-line no-unused-vars
              .then(({ data }) => {
                notifySuccess('The user was successfully created');
                disableLoading();
                history.push('/auth/login');
              })
              .catch(error => {
                notifyError(error.message);
                disableLoading();
                formik.setSubmitting(false);
              });
            disableLoading();
          })
          .catch(error => {
            notifyError(error.message);
            disableLoading();
            formik.setSubmitting(false);
          });
      }, 1400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">
        <TitleSection>
          <h3>Person Information</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input
              id="firstname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              aria-describedby="component-error-text"
            />
            {formik.errors.firstname ? <FormHelperText id="component-error-text" error>{formik.errors.firstname}</FormHelperText> : null}

          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              aria-describedby="component-error-text"
            />
            {formik.errors.lastname ? <FormHelperText id="component-error-text" error>{formik.errors.lastname}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="documentid">Document ID</InputLabel>
            <Input
              id="documentid"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.documentid}
              aria-describedby="component-error-text"
            />
            {formik.errors.documentid ? <FormHelperText id="component-error-text" error>{formik.errors.documentid}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              id="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              aria-describedby="component-error-text"
            />
            {formik.errors.phone ? <FormHelperText id="component-error-text" error>{formik.errors.phone}</FormHelperText> : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="historynumber">History Number</InputLabel>
            <Input
              id="historynumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.historynumber}
              aria-describedby="component-error-text"
            />
            {formik.errors.historynumber ? <FormHelperText id="component-error-text" error>{formik.errors.historynumber}</FormHelperText> : null}
          </FormControl>
        </WrapperField>
        <TitleSection>
          <h3>User Information</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              id="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              aria-describedby="component-error-text"
            />
            {formik.errors.email ? <FormHelperText id="component-error-text" error>{formik.errors.email}</FormHelperText> : null}

          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">username</InputLabel>
            <Input
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              aria-describedby="component-error-text"
            />
            {formik.errors.username ? <FormHelperText id="component-error-text" error>{formik.errors.username}</FormHelperText> : null}

          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-describedby="component-error-text"
            />
            {formik.errors.password ? <FormHelperText id="component-error-text" error>{formik.errors.password}</FormHelperText> : null}
          </FormControl>
        </WrapperField>
        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
            Save
          </Button>
          {loading && (
          <CircularProgress color="secondary" />
          )}
        </WrapperButton>
      </WrapperLogin>

    </form>
  );
};

export default PatientInformation;
