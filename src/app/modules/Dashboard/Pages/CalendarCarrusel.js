/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Banner from './Banner';
import Alert from '../../../../components/Alert';

const Wrapper = styled.div`  
  width: 100%;
  height: 100%;
`;

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

const defaultDepartment = {
  attributes: {
    name: 'Not selected',
  },
  id: 0,
  relationships: {
    doctors: {
      data: [
        {
          id: 0,
          type: '',
        },
      ],
    },
  },
  type: '',
};

const CalendarCarrusel = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [animation, setAnimation] = useState('fade');
  const [indicators, setIndicators] = useState(true);
  const [timeout, setTimeout] = useState(500);
  const [navButtonsAlwaysVisible, setNavButtonsAlwaysVisible] = useState(true);
  const [navButtonsAlwaysInvisible, setNavButtonsAlwaysInvisible] = useState(false);
  const {
    doctorcalendars, doctors, departments, doctorsusers,
  } = useSelector(state => state.tokenStore);
  const departmentId = new URLSearchParams(useLocation().search).get('id');
  // eslint-disable-next-line no-unused-vars
  const [appointmentDateState, setAppointmentDateState] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [filterCalendar, setFilterCalendar] = useState(defaultCalendarList);
  const [listDoctorInformation, setListDoctorInformation] = useState(null);
  const [currentDepartment, setCurrentDepartment] = useState(defaultDepartment);

  useEffect(() => {
    if (doctorcalendars !== null && doctors !== null && doctorsusers !== null) {
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

        const usersFounded = doctorsusers.find(user => {
          const userId = Number(user.id);
          const filterUserId = Number(filterCalendarByDepartment[index].attributes.user_id);
          if (userId === filterUserId) return user;
          return null;
        });

        filterCalendarByDepartment[index]
          .attributes
          .linkImage = usersFounded.attributes.linkImage;
      }
      setFilterCalendar(filterCalendarByDepartment);
    }
  }, [doctorcalendars, doctors, doctorsusers, departmentId]);

  useEffect(() => {
    if (departments !== null) {
      const departmentFounded = departments.find(department => {
        const departmentIdState = Number(departmentId);
        const relId = Number(department.attributes.id);
        if (relId === departmentIdState) return department;
        return null;
      });
      setCurrentDepartment(departmentFounded);
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
      if (newslice.length !== 0) {
        banners.push(<Banner item={newslice} key={index} />);
      }
      initialSlice = lastSlice;
      lastSlice += 3;
    }
    return banners;
  };

  useEffect(() => {
    const listResult = getTagsBySlice();
    setListDoctorInformation(listResult);
  }, [filterCalendar]);

  return (
    <Wrapper className="m-0 px-0 py-5">
      {
        listDoctorInformation === null || listDoctorInformation.length === 0
          ? (
            <Alert
              message={`There is not information for the service ${currentDepartment.attributes.name} `}
              footerMessage="Ask the administration for more information"
            />
          )
          : (
            <Carousel
              className="Example"
              autoPlay={autoPlay}
              animation={animation}
              indicators={indicators}
              timeout={timeout}
              navButtonsAlwaysVisible={navButtonsAlwaysVisible}
              navButtonsAlwaysInvisible={navButtonsAlwaysInvisible}
            >
              {
          listDoctorInformation.map(item => (
            item
          ))
        }
            </Carousel>
          )
      }
    </Wrapper>
  );
};

export default CalendarCarrusel;
