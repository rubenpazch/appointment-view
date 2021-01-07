import React from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import toAbsoluteUrl from '../../../../helpers/assetsHelpers';
import Login from './Login';
import ContentRoute from '../../../../layout/components/ContentRoute';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';

// eslint-disable-next-line import/prefer-default-export
export function AuthPage() {
  return (
    <>
      <div>
        {/* begin::Login */}
        <div id="kt_login">
          {/* begin::Aside */}
          <div style={{
            backgroundImage: `url(${toAbsoluteUrl('/media/bg/bg-4.jpg')})`,
          }}
          >
            {/* begin: Aside Container */}
            <div>
              {/* start:: Aside header */}
              <Link to="/">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl('/media/logos/stars.png')}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div>
                <h3>
                  Welcome to Clinic Appointment
                </h3>
                <p>
                  The ultimate Bootstrap & React 17 admin theme framework for
                  next generation web apps.
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div>
                <div>
                  &copy; Clinic Appointment
                </div>
                <div>
                  <Link to="/terms">
                    Privacy
                  </Link>
                  <Link to="/terms">
                    Legal
                  </Link>
                  <Link to="/terms">
                    Contact
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/* end: Aside Container */}
          </div>
          {/* begin::Aside */}

          {/* begin::Content */}
          <div>
            {/* begin::Content header */}
            <div>
              <span>
                Dont have an account yet?
              </span>
              <Link
                to="/auth/registration"
                id="kt_login_signup"
              >
                Sign Up!
              </Link>
            </div>
            {/* end::Content header */}

            {/* begin::Content body */}
            <div>
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/* end::Content body */}

            {/* begin::Mobile footer */}
            <div>
              <div>
                &copy; 2020 Appointment Clinic
              </div>
              <div>
                <Link to="/terms">
                  Privacy
                </Link>
                <Link to="/terms">
                  Legal
                </Link>
                <Link to="/terms">
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Login */}
      </div>
    </>
  );
}
