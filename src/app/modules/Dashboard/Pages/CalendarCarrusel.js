/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import Banner from './Banner';

const Wrapper = styled.div`  
  width: 100%;
  height: 100%;
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
  {
    id: 4,
    doctorname: 'Che Aparicio Ortiz',
    imagelink: '/media/doctors/doctor1.jpg',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 5,
    doctorname: 'Oracio Carpio',
    imagelink: '/media/doctors/doctor2.jpg',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 6,
    doctorname: 'Pedrito Paredes',
    imagelink: '/media/doctors/doctor4.jpg',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 7,
    doctorname: 'Dionisia Aparicio Ortiz',
    imagelink: '/media/doctors/doctor1.jpg',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 8,
    doctorname: 'Clara Carpio',
    imagelink: '/media/doctors/doctor2.jpg',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
  {
    id: 9,
    doctorname: 'Maria Paredes',
    imagelink: '/media/doctors/doctor4.jpg',
    starttime: '08:00',
    endtime: '16:00',
    location: 'consultorio 101',
    phonenumber: '23847623423687',
  },
];

const CalendarCarrusel = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [animation, setAnimation] = useState('fade');
  const [indicators, setIndicators] = useState(true);
  const [timeout, setTimeout] = useState(500);
  const [navButtonsAlwaysVisible, setNavButtonsAlwaysVisible] = useState(false);
  const [navButtonsAlwaysInvisible, setNavButtonsAlwaysInvisible] = useState(false);

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const toggleIndicators = () => {
    setIndicators(!indicators);
  };

  const toggleNavButtonsAlwaysVisible = () => {
    setNavButtonsAlwaysInvisible(!navButtonsAlwaysInvisible);
  };

  const toggleNavButtonsAlwaysInvisible = () => {
    setNavButtonsAlwaysVisible(!navButtonsAlwaysVisible);
  };

  const changeAnimation = event => {
    setAnimation(event.target.value);
  };

  const changeTimeout = (event, value) => {
    setTimeout(value);
  };

  const getSliceSize = length => {
    if (length % 3 > 0) return length / 3 + 1;
    return length / 3;
  };

  const getTagsBySlice = () => {
    const totalIterations = getSliceSize(doctorcalendars.length);
    const banners = [];
    let initialSlice = 0;
    let lastSlice = 3;
    for (let index = 0; index < totalIterations; index += 1) {
      const newslice = doctorcalendars.slice(initialSlice, lastSlice);
      console.log({ newslice });
      banners.push(<Banner item={newslice} key={index} />);
      initialSlice = lastSlice;
      lastSlice += 3;
    }
    return banners;
  };

  return (
    <Wrapper className="m-0 px-0 py-5">
      <Carousel
        className="Example"
        autoPlay={autoPlay}
        animation={animation}
        indicators={indicators}
        timeout={timeout}
        navButtonsAlwaysVisible={navButtonsAlwaysVisible}
        navButtonsAlwaysInvisible={navButtonsAlwaysInvisible}
      >
        {getTagsBySlice().map(item => (
          item
        ))}
      </Carousel>

    </Wrapper>
  );
};

export default CalendarCarrusel;
