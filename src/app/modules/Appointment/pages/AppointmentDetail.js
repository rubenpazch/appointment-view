/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  padding: 0;
  margin:0;
  border-bottom: 1px dashed black;
`;

const TimeWrapper = styled.div`  
  width: 10%;
  padding: 5px 0 0 0;
  margin: 0;
  h1 {
    font-size: 1rem;
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 0.8rem;
    padding: 0;
    margin: 0;
  }
`;

const AppointmentContent = styled.div`
  width: 80%;
  padding: 0;
  h2 {
    font-size: 1rem;
  }
  h3 {    
    font-size: 0.9rem;
  }
  span {
    padding: 0;
    margin: 0;
  }
`;

const AppointmentName = styled.div`
  width:100%;
  padding: 0;
  margin: 0;
  h2 {
    padding: 0;
    margin: 0;
  }
`;
const StatusAppointment = styled.div`
  background-color: #f9fff9;
  width: 10%;
  margin: 5px;
  color: #208e13;
  border-radius: 5px;
  border: 1px dashed;
`;

const AppointmentService = styled.div`
  h3 {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    color: #3c6ecc;
  }
`;
const StatusAppointmentBusy = styled.div`
  background-color: #fff7f7;
  width: 10%;
  margin: 5px;
  color: #ff0202;
  border-radius: 5px;
  border: 1px dashed;
`;

const AppointmentDetail = ({
  time,
  endTime,
  patient,
  service,
  office,
  status,
}) => {
  const test = '';

  return (
    <Wrapper className="d-flex flex-row">
      <TimeWrapper className="d-flex flex-row justify-content-around align-items-start mr-1 mt-1">
        <div className="d-flex flex-column align-items-start">
          <h1>{time}</h1>
          <span>{endTime}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} />
        </div>
      </TimeWrapper>
      <AppointmentContent className="d-flex flex-column">
        <AppointmentName className="d-flex flex-row align-items-center">
          <span className="px-3">Patient: </span>
          <h2>{patient}</h2>
        </AppointmentName>
        <AppointmentService className="d-flex flex-row align-items-center">
          <div className="px-3">
            <h3>
              {service}
              {test}
            </h3>
          </div>
        </AppointmentService>
      </AppointmentContent>
      { status
        ? (
          <StatusAppointmentBusy className="d-flex flex-column align-items-center pt-2 font-weight-bold">
            <span>Busy</span>
          </StatusAppointmentBusy>
        )
        : (
          <StatusAppointment className="d-flex flex-column align-items-center pt-2 font-weight-bold">
            <span>Free</span>
          </StatusAppointment>
        )}

    </Wrapper>
  );
};

export default AppointmentDetail;
