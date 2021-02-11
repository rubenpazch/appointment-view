/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`  
  background-color: ${props => (props.status ? '#fff3f3' : '#d0ffd0')};
  border: 1px solid ${props => (props.status ? '#f9c4c4' : '#6fff6f')};
  border-radius: 5px;
  width: 24%;
`;

const TimeWrapper = styled.div`
  width: 100%;  
  h1 {
    font-size: 0.8rem;    
    font-weight: 800;
  }
  span {
    font-size: 0.8rem;
    font-weight: 800;
  }
`;

const AppointmentContent = styled.div`  
  width: 100%;  
  h2 {
    font-size: 0.8rem;
  }
  h3 {    
    font-size: 0.7rem;
  }
  span {    
    font-size: 0.7rem;
  }
`;

const AppointmentName = styled.div`
  width:100%;
  text-transform: uppercase;
`;
const StatusAppointment = styled.div`
  background-color: ${props => (props.status ? '#fff3f3' : '#d0ffd0')};
  color: ${props => (props.status ? '#ff0202' : '#148a00')};;
  border-radius: 5px;  
`;

const AppointmentDetail = ({
  time,
  endTime,
  patient,
  status,
}) => (
  <Wrapper className="d-flex flex-column px-1 pb-1 m-1" status={status}>
    <TimeWrapper className="d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex flex-row align-items-center">
        <div className="mr-2">
          <FontAwesomeIcon icon={faClock} />
        </div>
        <div className="d-flex flex-row align-items-center">
          <h1 className="m-0 p-0">{`${time}`}</h1>
          <span>&#8594;</span>
          <span className="m-0 p-0">{`${endTime}`}</span>
        </div>
      </div>
      <div>
        <StatusAppointment className="d-flex flex-column align-items-center font-weight-bold" status={status}>
          <span className="p-1">{ status ? 'Taked' : 'Free'}</span>
        </StatusAppointment>
      </div>
    </TimeWrapper>
    <AppointmentContent className="d-flex flex-column">
      <AppointmentName className="d-flex flex-row">
        <span className="p-0 mr-2">Patient : </span>
        <h2 className="p-0 m-0">{patient}</h2>
      </AppointmentName>
    </AppointmentContent>
  </Wrapper>
);

AppointmentDetail.propTypes = {
  time: PropTypes.string,
  endTime: PropTypes.string,
  patient: PropTypes.string,
  status: PropTypes.any,
};

AppointmentDetail.defaultProps = {
  time: '',
  endTime: '',
  patient: '',
  status: '',
};

export default AppointmentDetail;
