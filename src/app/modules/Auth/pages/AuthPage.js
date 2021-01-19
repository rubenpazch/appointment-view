import React from 'react';
import {
  Link, Switch, Redirect, Route,
} from 'react-router-dom';
import styled from 'styled-components';
import toAbsoluteUrl from '../../../../helpers/assetsHelpers';
import Login from './Login';
// import ContentRoute from '../../../../layout/components/ContentRoute';
import Registration from './Registration';
// import ForgotPassword from './ForgotPassword';

const Wrapper = styled.div`  
  min-height: 100vh;
`;

const MainContent = styled.div`  
  min-height: 100vh;
`;

const LeftAside = styled.div`
  background-color: green;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 450px;
  background-image: url(${toAbsoluteUrl('/media/bg/bg-5.jpg')});  
`;

const ContentAside = styled.div`  
  min-width: 60vw;
`;

const ContentLeftAside = styled.div`
  text-shadow: 2px 2px 5px white;

  a {
    color: black;
  }
`;

const WrapperSignUp = styled.div`  
  display: block;
`;

const WrapperLogin = styled.div`  
  width: 100vw;
  height: 100%;
`;

// eslint-disable-next-line import/prefer-default-export
export function AuthPage() {
  return (
    <>
      <Wrapper className="d-flex flex-column">
        <MainContent className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row">
          <LeftAside className="d-flex">
            <ContentLeftAside
              className="d-flex flex-column flex-sm-column flex-md-column flex-lg-column justify-content-between"
            >
              <Link to="/">
                <img
                  alt="Logo"
                  src={toAbsoluteUrl('/media/logos/logo.png')}
                />
              </Link>
              <div className="d-flex flex-column m-3">
                <h3>
                  Welcome to Clinic Appointment
                </h3>
                <p>
                  Managment of clinical Appointment, Multiple Services, Patient Registration.
                </p>
              </div>
              <div className="d-flex flex-row d-sm-none justify-content-between m-3">
                <div>
                  &copy; Appointment App
                </div>
                <div>
                  <Link to="/terms">
                    Contact
                  </Link>
                </div>
              </div>
            </ContentLeftAside>
          </LeftAside>

          <ContentAside className="d-flex flex-column overflow-hidden">
            <WrapperSignUp className="d-flex flex-row justify-content-end pr-3 pt-3">
              <span>
                Dont have an account yet?
              </span>
              <Link
                to="/auth/registration"
                id="kt_login_signup"
              >
                Sign Up!
              </Link>
            </WrapperSignUp>
            <WrapperLogin className="d-flex align-items-center">
              <Switch>
                <Route path="/auth/login">
                  <Login />
                </Route>
                <Route path="/auth/registration">
                  <Registration />
                </Route>
                <Redirect from="/auth" exact to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </WrapperLogin>
            <div className="d-flex d-lg-none flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; Appointment App
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
          </ContentAside>

        </MainContent>

      </Wrapper>
    </>
  );
}
