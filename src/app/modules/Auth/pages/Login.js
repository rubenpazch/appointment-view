/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// import * as auth from '../_redux/authRedux';
import { login } from '../_redux/authCrud';

// eslint-disable-next-line no-unused-vars
const initialValues = {
  email: 'admin@test.com',
  password: 'demo',
};

// eslint-disable-next-line no-unused-vars
const Login = props => {
  // eslint-disable-next-line no-console
  console.log({ props });
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimun 3 symbols')
      .required({
        id: 'AUTH.VALIDATION.REQUIRED_FIELD',
      }),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        {
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        },
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    // eslint-disable-next-line no-unused-vars
    onSubmit: (values, { setStatus, setSubmitting }) => {
      // eslint-disable-next-line no-console
      console.log({ values });
      setTimeout(() => {
        login(values.email, values.password);
      }, 1000);
    },
  });

  const getInputClasses = fieldname => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid';
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid';
    }

    return '';
  };

  return (
    <div>
      {/* begin::Head */}
      <div>
        <h3>
          formated message
        </h3>
        <p>
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/* begin::Form */}
      <form>
        {formik.status ? (
          <div>
            <div>{formik.status}</div>
          </div>
        ) : (
          <div>
            <div>
              Use account
              {' '}
              <strong>admin@demo.com</strong>
              {' '}
              and password
              {' '}
              <strong>demo</strong>
              {' '}
              to continue.
            </div>
          </div>
        )}
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            className={`${getInputClasses('email')}`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div>
          <Link
            to="/auth/forgot-password"
            id="kt_login_forgot"
          >
            forgot password
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3"
          >
            <span>Sign In</span>
            <span className="ml-3 spinner spinner-white" />
          </button>
        </div>
      </form>
      {/* end::Form */}
    </div>
  );
};

Login.defaultProps = {
  props: {},
};

Login.propTypes = {
  props: PropTypes.object,
};

export default Login;
