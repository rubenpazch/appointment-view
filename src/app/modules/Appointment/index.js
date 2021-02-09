/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom';

import MenuList from '../../../components/MenuList';
import Footer from './pages/Footer';
import Title from './pages/Title';
import PrimarySearchAppBar from '../../../components/PrimarySearchAppBar';
import { ListAppointmentByPatient } from './_redux/appointmentService';

const Wrapper = styled.div`
`;

const LeftContainer = styled.div` 
  min-height: 100vh;
  min-width: 170px;  
`;

const RigthContainer = styled.div` 
  min-height: 100vh;  
`;
const LogoContainer = styled.div`  
  min-height: 15vh;
  height: 15vh;

  img {
    width: 125px;
    margin-top: 10px;
    margin-left: 5px;
  }
`;

const TopContainer = styled.div`
  height: 22vh;
  min-height: 22vh;  
  width: 100%;
  min-width: 100%;
`;

const BottonContainer = styled.div`
  height: 78vh;
  min-height: 78vh;
  width: 100%;
  min-width: 100%;
`;

const Appointment = () => {
  const { path, url } = useRouteMatch();

  useEffect(() => {
    ListAppointmentByPatient('785')
      .then(({ data }) => {
        console.log({ data });
      })
      .catch(error => {
      // console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  }, []);
  return (
    <>
      <PrimarySearchAppBar />
      <Wrapper className="container-fluid flex-nowrap">
        <div className="row flex-row flex-nowrap">
          <LeftContainer className="col-2 p-0 border-right">
            <div className="row d-flex flex-column m-0 p-0">
              <div className="col m-0 p-0">
                <LogoContainer />
              </div>
              <div className="col m-0 p-0">
                <MenuList />
              </div>
              <div className="col m-0 p-0">
                <Footer />
              </div>
            </div>
          </LeftContainer>
          <RigthContainer className="col-10">
            <Switch>
              <Route exact path={path}>
                <h3>Please select a service.</h3>
              </Route>
              <Route exact path={`${path}/:departmentname`}>
                <div className="row d-flex flex-column">
                  <TopContainer className="col-4 p-0">
                    <Title />
                  </TopContainer>
                </div>
              </Route>
              <Route path={`${path}/:departmentname/:doctorname`}>
                <Appointment />
              </Route>
            </Switch>
          </RigthContainer>
        </div>
      </Wrapper>
    </>
  );
};

export default Appointment;
