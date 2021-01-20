/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
// import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  useFormik,
} from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { setToken } from '../_redux/authAction';
// import * as auth from '../_redux/authRedux';
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
          .then(({ data: { token, username } }) => {
            dispatch(setToken({ token, username }));
            disableLoading();
          })
          .catch(() => {
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
        <WrapperUsername className="d-flex flex-row justify-content-center">
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
        </WrapperUsername>

        <WrapperPassword className="d-flex flex-row justify-content-center">
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
