// eslint-disable react-hooks/exhaustive-deps
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AppointmentDetail from './AppointmentDetail';
import { ListAppointmentByPatient } from '../_redux/appointmentService';
import { ToastContext } from '../../../../components/ToastContextProvider';

const Wrapper = styled.div`  
  width: 100%;
  height: 100%;
`;

const ListByPatient = () => {
  const [listOfAppointments, setListOfAppointments] = useState();
  const { notifyError } = useContext(ToastContext);
  // eslint-disable-next-line camelcase
  const { doctors, doctorsusers, user_id } = useSelector(state => state.tokenStore);

  useEffect(() => {
    ListAppointmentByPatient(user_id)
      .then(({ data }) => {
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

        if (doctorsusers !== null && arrayOfPerson !== null) {
          for (let k = 0; k < listOfAppointments.length; k += 1) {
            const tempDoctorUser = doctorsusers.find(item => Number(item.id)
            === Number(listOfAppointments[k].attributes.doctor_id));

            const tempDepartment = arrayOfDepartments.find(item => Number(item.id)
            === Number(listOfAppointments[k].relationships.department.data.id));

            listOfAppointments[k]
              .attributes
              .person_doctor_id = tempDoctorUser.attributes.person_id;

            listOfAppointments[k]
              .relationships
              .department
              .data.name = tempDepartment.attributes.name;

            listOfAppointments[k]
              .relationships
              .department
              .data.location = tempDepartment.attributes.location;
          }

          for (let t = 0; t < listOfAppointments.length; t += 1) {
            const tempPerson = doctors.find(item => Number(item.id)
            === Number(listOfAppointments[t].attributes.person_doctor_id));
            listOfAppointments[t]
              .attributes
              .firstName = tempPerson.attributes.firstName;
            listOfAppointments[t]
              .attributes
              .lastName = tempPerson.attributes.lastName;
          }
          setListOfAppointments(listOfAppointments);
        }
      })
      .catch(error => {
        notifyError(error.message);
      });
  }, [doctorsusers]);
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
      {
        listOfAppointments !== null && typeof (listOfAppointments) !== 'undefined'
          ? listOfAppointments.map(item => (
            <AppointmentDetail
              key={item.id}
              time={moment.utc(item.attributes.startTime).format('HH:mm')}
              endTime={moment.utc(item.attributes.endTime).format('HH:mm')}
              patient={`${item.attributes.firstName} ${item.attributes.lastName}`}
              service={item.relationships.department.data.name}
              office={item.relationships.department.data.location}
              date={item.attributes.appointmentDate}
              status
            />
          ))
          : <h1>empty</h1>
      }
    </Wrapper>
  );
};

export default ListByPatient;
