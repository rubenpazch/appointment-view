/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import MenuList from '../../../components/MenuList';
import Footer from './Pages/Footer';
import Title from './Pages/Title';
import CalendarCarrusel from './Pages/CalendarCarrusel';
import Appointment from './Pages/Appointment';
import PrimarySearchAppBar from '../../../components/PrimarySearchAppBar';

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

const Dashboard = () => {
  const { path, url } = useRouteMatch();
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
                <div className="d-flex flex-row justify-content-center align-items-center w-100 h-75">
                  <h3 className="m-0 p-0">Please select a service.</h3>
                </div>
              </Route>
              <Route exact path={`${path}/:departmentname`}>
                <div className="row d-flex flex-column">
                  <TopContainer className="col-4 p-0">
                    <Title />
                  </TopContainer>
                  <BottonContainer className="col-8 m-0 p-0">
                    <CalendarCarrusel />
                  </BottonContainer>
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

export default Dashboard;
