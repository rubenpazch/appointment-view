/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter, Switch, Route, NavLink, Redirect, useRouteMatch,
} from 'react-router-dom';
import { getDepartments } from '../app/modules/Auth/_redux/authService';
import { setDepartments } from '../app/modules/Auth/_redux/authAction';

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
      padding: 9px 0 0 15px;
      margin: 0;
      height: 40px;
      color: #fff;
    }
    
    li:hover {
      background-color: #98bd30;
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
                  className="normal"
                  activeStyle={{
                    fontWeight: 'bold',
                    color: '#fff',
                    backgroundColor: '#98bd30',
                    display: 'block',
                    padding: '2px 0 0 13px',
                    height: '30px',
                    width: '215px',
                    margin: '0 0 0 -10px',
                    lineHeight: '27px',
                  }}
                  exact
                >
                  {item.attributes.name}
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
