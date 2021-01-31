/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Banner from './Banner';

const Wrapper = styled.div`  
  width: 100%;
  height: 100%;
`;

const doctorcalendarsLocal = [
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

const defaultCalendarList = [
  {
    attributes: {
      endDate: '2021-01-31',
      endTime: '2000-01-01T16:00:00.000Z',
      id: 1597,
      shiftinterval: 15,
      startDate: '2021-01-31',
      startTime: '2000-01-01T08:00:00.000Z',
      totalHours: 8,
      user_id: 294,
    },
    id: 0,
    relationships: {
      department: {
        data: {
          contactNumber: '+6865313974001',
          id: '231',
          location: '739 Agustin Lock',
          type: 'department',
        },
      },
      person: {
        data: {
          firstName: 'Layla',
          id: '301',
          lastName: 'Ortiz',
          phone: '+37412920804764',
          type: 'person',
        },
      },
      user: {
        data: {
          id: '294',
          type: 'user',
        },
      },
    },
  },
];

const CalendarCarrusel = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [animation, setAnimation] = useState('fade');
  const [indicators, setIndicators] = useState(true);
  const [timeout, setTimeout] = useState(500);
  const [navButtonsAlwaysVisible, setNavButtonsAlwaysVisible] = useState(false);
  const [navButtonsAlwaysInvisible, setNavButtonsAlwaysInvisible] = useState(false);
  const { doctorcalendars, doctors, departments } = useSelector(state => state.tokenStore);
  const departmentId = new URLSearchParams(useLocation().search).get('id');
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [filterCalendar, setFilterCalendar] = useState(defaultCalendarList);

  useEffect(() => {
    if (doctorcalendars !== null) {
      const filterCalendarByDepartment = doctorcalendars.filter(item => {
        if (
          Number(item.relationships.department.data.id) === Number(departmentId)
          && appointmentDateState === item.attributes.startDate
        ) {
          return item;
        }
        return null;
      });
      for (let index = 0; index < filterCalendarByDepartment.length; index += 1) {
        const doctorFounded = doctors.find(doctor => {
          const doctorId = Number(doctor.id);
          const id = Number(filterCalendarByDepartment[index].relationships.person.data.id);
          if (doctorId === id) return doctor;
          return null;
        });

        filterCalendarByDepartment[index]
          .relationships
          .person
          .data.firstName = doctorFounded.attributes.firstName;
        filterCalendarByDepartment[index]
          .relationships
          .person
          .data.lastName = doctorFounded.attributes.lastName;
        filterCalendarByDepartment[index]
          .relationships
          .person
          .data.phone = doctorFounded.attributes.phone;

        const departmentFounded = departments.find(department => {
          const departmentId = Number(department.id);
          const relId = Number(filterCalendarByDepartment[index].relationships.department.data.id);
          if (relId === departmentId) return department;
          return null;
        });

        filterCalendarByDepartment[index]
          .relationships
          .department
          .data.contactNumber = departmentFounded.attributes.contactNumber;

        filterCalendarByDepartment[index]
          .relationships
          .department
          .data.location = departmentFounded.attributes.location;
      }
      console.log({ filterCalendarByDepartment });
      setFilterCalendar(filterCalendarByDepartment);
    }
  }, [departmentId]);

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
    if (length <= 3) return 1;
    if (length % 3 > 0) return length / 3 + 1;
    return length / 3;
  };

  const getTagsBySlice = () => {
    const totalIterations = getSliceSize(filterCalendar.length);
    const banners = [];
    let initialSlice = 0;
    let lastSlice = 3;
    for (let index = 0; index < totalIterations; index += 1) {
      const newslice = filterCalendar.slice(initialSlice, lastSlice);
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
