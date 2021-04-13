/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  getDepartments,
  getDoctorCalendars,
} from '../app/modules/Auth/_redux/authService';
import {
  setDepartments,
  setDoctorCalendars,
  setDoctors,
  setDoctorsUsers,
} from '../app/modules/Auth/_redux/authAction';

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

  useEffect(() => {
    getDoctorCalendars()
      .then(({ data }) => {
        const includedList = data.included;
        const arrayOfDoctors = [];
        const arrayOfUsersDoctors = [];
        for (let indexIL = 0; indexIL < includedList.length; indexIL += 1) {
          if (includedList[indexIL].type === 'person') {
            arrayOfDoctors.push(includedList[indexIL]);
          }
          if (includedList[indexIL].type === 'user') {
            arrayOfUsersDoctors.push(includedList[indexIL]);
          }
        }
        dispatch(setDoctorCalendars(data));
        dispatch(setDoctors(arrayOfDoctors));
        dispatch(setDoctorsUsers(arrayOfUsersDoctors));
      }).catch(error => {
        console.log({ error });
        // setSubmitting(false);doctorcalendars
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
