/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-top: 1px dotted #000;
  width: 90%;
`;

const TimeWrapper = styled.div`
  border-right: 1px dotted #000;
  width: 15%;  
  h1 {
    font-size: 0.9rem;    
    font-weight: 400;
  }
  span {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

const AppointmentContent = styled.div`
  border-right: 1px dotted #000;
  width: 30%;
  h2 {
    font-size: 0.8rem;
    font-weight: 500;
  }
  h3 {    
    font-size: 0.7rem;
  }
  span {    
    font-size: 0.7rem;
  }
`;

const AppointmentLocation = styled.div`  
  width: 20%;
  h2 {
    font-size: 0.8rem;
    font-weight: 500;
  }
  h3 {    
    font-size: 0.7rem;
  }
  span {    
    font-size: 0.7rem;
  }
`;

const AppointmentService = styled.div`
  border-right: 1px dotted #000;
  width: 20%;
  h2 {
    font-size: 0.8rem;
    font-weight: 500;
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

const AppointmentDate = styled.div`
  width: 10%;
  border-right: 1px dotted #000;
  p {
    font-weight: 500;
    font-size: 0.9rem;
    color: #000;
  }
`;

const AppointmentDetail = ({
  time,
  endTime,
  patient,
  service,
  office,
  status,
  date,
}) => (
  <Wrapper className="d-flex flex-row px-1 pb-0 m-1" status={status}>
    <AppointmentDate className="d-flex flex-row align-items-center">
      <p className="m-0 px-2">{date}</p>
    </AppointmentDate>
    <TimeWrapper className="d-flex flex-row align-items-center justify-content-center px-2">
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center">
          <h1 className="m-0 p-0">{`${time}`}</h1>
          <span>&#8594;</span>
          <span className="m-0 p-0">{`${endTime}`}</span>
        </div>
      </div>
    </TimeWrapper>
    <AppointmentContent className="d-flex flex-row align-items-center px-3">
      <AppointmentName className="d-flex flex-row justify-content-center">
        <h2 className="p-0 m-0">{patient}</h2>
      </AppointmentName>
    </AppointmentContent>
    <AppointmentService className="d-flex flex-row align-items-center px-3">
      <AppointmentName className="d-flex flex-row justify-content-center">
        <h2 className="p-0 m-0">{service}</h2>
      </AppointmentName>
    </AppointmentService>
    <AppointmentLocation className="d-flex flex-row align-items-center px-3">
      <AppointmentName className="d-flex flex-row justify-content-center">
        <h2 className="p-0 m-0">{office}</h2>
      </AppointmentName>
    </AppointmentLocation>
  </Wrapper>
);

AppointmentDetail.propTypes = {
  time: PropTypes.string,
  endTime: PropTypes.string,
  patient: PropTypes.string,
  service: PropTypes.string,
  office: PropTypes.string,
  status: PropTypes.any,
  date: PropTypes.string,
};

AppointmentDetail.defaultProps = {
  time: '',
  endTime: '',
  patient: '',
  service: '',
  office: '',
  status: '',
  date: '',
};

export default AppointmentDetail;
