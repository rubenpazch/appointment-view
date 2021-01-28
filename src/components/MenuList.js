/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter, Switch, Route, NavLink, Redirect, useRouteMatch,
} from 'react-router-dom';
import { getDepartments } from '../app/modules/Auth/_redux/authService';
import { setDepartments } from '../app/modules/Auth/_redux/authAction';

const MenuContainer = styled.div`
  min-height: 75vh;
  height: 75vh;
  ul {
    background-color: #fff;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {      
      margin: 0; 
      padding: 0;
      color: #fff;
      padding: 5px 0px 10px 15px;
    }
    
    .linkMenu {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      text-decoration: none;
      color: #000;
    }
    .linkMenu:active {
      text-decoration: underline;
    }
    .nameLinkMenu{    
      padding: 0;
      margin: 0;
    }

    li:hover {
      background-color: #98bd30;
      margin: 0; 
      padding: 0;
      padding: 5px 0px 10px 15px;
      color: #fff;
    }
    li:active {
      background-color: #98bd30;
      margin: 0; 
      padding: 5px 0px 10px 15px;
      color: #fff;
    }
  }
`;

const MenuList = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const { departments } = useSelector(state => state.tokenStore);
  console.log({ departments });
  useEffect(() => {
    getDepartments()
      .then(({ data }) => {
        dispatch(setDepartments(data));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);
        // setStatus('not working');
      });
  }, []);
  return (
    <>
      <MenuContainer>
        <ul>
          {departments !== null
            ? departments.map(item => (
              <li key={item.id}>
                <NavLink
                  to={`${url}/${item.attributes.name.replace(/ /g, '_')}?id=${item.id}`}
                  activeStyle={{
                    fontWeight: 900,
                  }}
                  className="linkMenu"
                  exact
                >
                  <span className="nameLinkMenu">
                    {item.attributes.name}
                  </span>
                </NavLink>
              </li>
            ))
            : <p />}
        </ul>
      </MenuContainer>
    </>
  );
};

export default MenuList;
