/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Link,
  BrowserRouter as Router,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom';

import toAbsoluteUrl from '../../../helpers/assetsHelpers';
import MenuList from '../../../components/MenuList';
import Footer from './Pages/Footer';
import Title from './Pages/Title';
import CalendarCarrusel from './Pages/CalendarCarrusel';

const Wrapper = styled.div`
`;

const LeftContainer = styled.div` 
  min-height: 100vh;
  min-width: 220px;  
`;

const RigthContainer = styled.div` 
  min-height: 100vh;  
`;
const LogoContainer = styled.div`  
  min-height: 15vh;
  height: 15vh;

  img {
    width: 150px;
  }
`;

const TopContainer = styled.div`
  height: 15vh;
  min-height: 15vh;  
  width: 100%;
  min-width: 100%;
`;

const BottonContainer = styled.div`
  height: 85vh;
  min-height: 85vh;
  width: 100%;
  min-width: 100%;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TopicChild = () => {
  const { departmentname } = useParams();
  const query = useQuery();
  return (
    <div>
      <h3>{departmentname}</h3>
      <h1>{query.get('id')}</h1>
    </div>
  );
};

const Dashboard = () => {
  const { path, url } = useRouteMatch();
  console.log('test');
  return (
    <Wrapper className="container-fluid flex-nowrap">
      <div className="row flex-row flex-nowrap">
        <LeftContainer className="col-2 p-0 border-right">
          <div className="row d-flex flex-column m-0 p-0">
            <div className="col m-0 p-0">
              <LogoContainer>
                <img
                  alt="Logo"
                  src={toAbsoluteUrl('/media/logos/logo.png')}
                />
              </LogoContainer>
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
            <Route path={`${path}/:departmentname`}>
              <div className="row d-flex flex-column">
                <TopContainer className="col-4 p-0">
                  <Title />
                </TopContainer>
                <BottonContainer className="col-8 m-0 p-0">
                  <CalendarCarrusel />
                </BottonContainer>
              </div>
            </Route>
          </Switch>
        </RigthContainer>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
