/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppointmentDetail from './AppointmentDetail';
import { ListAppointmentByPatient } from '../_redux/appointmentService';

const Wrapper = styled.div`  
  width: 100%;
  height: 100%;
`;

const ListByPatient = () => {
  const [listOfAppointments, setListOfAppointments] = useState();

  useEffect(() => {
    ListAppointmentByPatient('557')
      .then(({ data }) => {
        console.log({ data });
        const listOfAppointments = data.data;
        const listOfIncludes = data.included;
        const arrayOfPerson = [];
        const arrayOfUsers = [];
        const arrayOfDepartments = [];

        for (let indexIL = 0; indexIL < listOfIncludes.length; indexIL += 1) {
          if (listOfIncludes[indexIL].type === 'person') {
            arrayOfPerson.push(listOfIncludes[indexIL]);
          }
          if (listOfIncludes[indexIL].type === 'user') {
            arrayOfUsers.push(listOfIncludes[indexIL]);
          }
          if (listOfIncludes[indexIL].type === 'department') {
            arrayOfDepartments.push(listOfIncludes[indexIL]);
          }
        }

        for (let k = 0; k < listOfAppointments.length; k += 1) {
          console.log(listOfAppointments[k]);
          listOfAppointments[k].attributes.service = 'casa';
        }
        console.log({ arrayOfPerson });
        console.log({ arrayOfUsers });
        console.log({ arrayOfDepartments });
        console.log({ listOfAppointments });
      })
      .catch(error => {
        console.log({ error });
      // setSubmitting(false);
      // setStatus('not working');
      });
  }, []);
  return (
    <Wrapper>
      <AppointmentDetail
        time="Start"
        endTime="End"
        patient="Doctor"
        service="Service"
        office="Location"
        date="Date"
        status
      />
      <AppointmentDetail
        time="8:00"
        endTime="9:00"
        patient="Carlos Paz Ortiz de Orue de Los Andes"
        service="Cirugia"
        office="Consultorio 5"
        date="01/01/1999"
        status
      />
    </Wrapper>
  );
};

export default ListByPatient;
