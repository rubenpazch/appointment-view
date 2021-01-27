/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
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

const Wrapper = styled.div` 
  padding: 0;
  margin: 0;
`;

const LeftContainer = styled.div` 
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100vh;
`;

const RigthContainer = styled.div` 
  padding: 0;
  margin: 0;
  min-height: 100vh;
  height: 100vh;
`;
const LogoContainer = styled.div`  
  min-height: 15vh;
  height: 15vh;

  img {
    width: 150px;
  }
`;
const MenuContainer = styled.div`
  min-height: 60vh;
  height: 70vh;

  ul {
    background-color: #fff;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      background-color: #fff;
      padding: 10px;
      margin: 0;
      height: 40px;
      color: #fff;

      a {
        color: #000;
        text-transform: uppercase;
        font-weight: 800;
      }
      a:visited {
        color: #000;
      }
      a:active {
        color: purple;
      }
    }
    
    li:hover {
      background-color: #98bd30;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
`;
const FooterContainer = styled.div` 
  min-height: 15vh;
  height: 15vh;
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
    <Container fluid>
      <Row>
        <Col xs={2} md={2} className="m-0 p-0">
          <LeftContainer>
            <Row className="m-0 p-0">
              <Col md={12} className="m-0 p-0">
                <LogoContainer>
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl('/media/logos/logo.png')}
                  />
                </LogoContainer>
              </Col>
              <Col md={12} className="m-0 p-0">
                <MenuContainer>
                  <MenuList />
                </MenuContainer>
              </Col>
              <Col md={12} className="m-0 p-0">
                <FooterContainer>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faClock} />
                    </li>
                  </ul>
                </FooterContainer>
              </Col>
            </Row>
          </LeftContainer>
        </Col>
        <Col xs={10} md={10} className="border-left">
          <RigthContainer>
            <Switch>
              <Route exact path={path}>
                <h3>Please select a service.</h3>
              </Route>
              <Route path={`${path}/:departmentname`}>
                <TopicChild />
              </Route>
            </Switch>
          </RigthContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
