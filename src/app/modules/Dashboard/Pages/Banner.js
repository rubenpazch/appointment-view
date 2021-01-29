/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import toAbsoluteUrl from '../../../../helpers/assetsHelpers';
import BannerItem from './BannerItem';

const Wrapper = styled.div`  
  max-width: 100%;
  min-height: 450px;
`;

const doctorcalendars = [
  {
    id: 1,
    doctorname: 'Carlos Aparicio Ortiz',
    imagelink: '/media/doctors/doctor3.png',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 2,
    doctorname: 'Ernesto Carpio',
    imagelink: '/media/doctors/doctor6.png',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 3,
    doctorname: 'Raul Paredes',
    imagelink: '/media/doctors/doctor5.png',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
];

const Banner = prop => {
  const { item } = prop;
  return (
    <Wrapper className="m-0 px-5">
      <BannerItem doctorcalendars={item} />
    </Wrapper>
  );
};

export default Banner;
