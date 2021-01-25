/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  useFormik,
} from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { setToken } from '../_redux/authAction';
import { login } from '../_redux/authService';

const WrapperUsername = styled.div` 
  padding: 15px;
`;

const WrapperLogin = styled.div`  
  min-width: 70vw;  
`;

const WrapperPassword = styled.div`  
  padding: 15px;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width:100%;
  max-width: 200px;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const [errorState, setErrorState] = useState('');

  useEffect(() => {
    setLoading(false);
    return () => setLoading(false);
  }, []);

  setTimeout(() => {
    setOpenAlert(false);
  }, (5000));

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
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
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: values => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password)
          .then(({ data: { token, username, user_id } }) => {
            dispatch(setToken({ token, username, user_id }));
            disableLoading();
          })
          .catch(error => {
            setOpenAlert(true);
            setErrorState('Incorrect Username or Password');
            disableLoading();
            // setSubmitting(false);
            // setStatus('not working');
          });
      }, 1400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">
        { openAlert
          ? (
            <div className="alert alert-danger" role="alert">
              {errorState}
            </div>
          )
          : null}

        <WrapperUsername className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">username</InputLabel>
            <Input
              id="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              aria-describedby="component-error-text"
            />
            { formik.touched.username && formik.errors.username
              ? <FormHelperText id="component-error-text" error>{formik.errors.username}</FormHelperText>
              : null}

          </FormControl>
        </WrapperUsername>

        <WrapperPassword className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              aria-describedby="component-error-text"
            />
            {formik.touched.password && formik.errors.password
              ? <FormHelperText id="component-error-text" error>{formik.errors.password}</FormHelperText>
              : null}
          </FormControl>
        </WrapperPassword>
        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          {loading && (
          <CircularProgress color="secondary" />
          )}
        </WrapperButton>
      </WrapperLogin>

    </form>
  );
};

// Login.defaultProps = {
//   props: {},
// };
//
// Login.propTypes = {
//   props: PropTypes.object,
// };
export default Login;
