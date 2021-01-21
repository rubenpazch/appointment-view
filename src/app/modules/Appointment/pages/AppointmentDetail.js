/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px dashed black;
  width:100%;
`;

const TimeWrapper = styled.div`  
  width:20%;
  border: 1px solid black;
`;

const AppointmentContent = styled.div`
  border: 1px solid black;
  width:80%;
`;

const AppointmentDetail = ({
  time, patient, service, office,
}) => {
  const test = '';

  return (
    <Wrapper className="d-flex flex-row">
      <TimeWrapper className="d-flex flex-row justify-content-center align-items-center">
        <h1>{time}</h1>
      </TimeWrapper>
      <AppointmentContent className="d-flex flex-column">
        <h2>{patient}</h2>
        <h3>
          {service}
          {test}
        </h3>
        <span>{office}</span>
      </AppointmentContent>
    </Wrapper>
  );
};

export default AppointmentDetail;
