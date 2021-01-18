/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import setToken from '../_redux/authAction';
// import * as auth from '../_redux/authRedux';
import { login } from '../_redux/authService';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          enableLoading();
          setTimeout(() => {
            login(values.username, values.password)
              .then(({ data: { token, username } }) => {
                dispatch(setToken({ token, username }));
                disableLoading();
              })
              .catch(() => {
                disableLoading();
                setSubmitting(false);
              });
          }, 1400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="username" name="username" />
            <ErrorMessage name="username" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              <span>Sign In</span>
              {loading && (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              )}
            </button>

          </Form>
        )}
      </Formik>
    </div>
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
