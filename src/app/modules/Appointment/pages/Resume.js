/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ContentResume = styled.div`
  padding: 15px;
  margin: 0 15px;
  min-height: 80px;
  border-radius: 5px;
  border: 1px dashed #3f51b5;

  span {
    font-size: 1rem;
    font-weight: 500;
    color: #000000;
    min-width: 100px;
  }
`;

const DoctorResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    margin: 0;
  }
`;

const ConsultoryResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    margin: 0;
  }
`;

const StartTimeResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    margin: 0;
  }
`;

const EndTimeResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    margin: 0;
  }
`;

const Resume = ({ doctorName, location }) => (
  <ContentResume className="d-flex flex-column">
    <div className="d-flex flex-row">
      <DoctorResume className="d-flex flex-row">
        <span>Doctor: </span>
        <p>
          {` Dr. ${doctorName}`}
        </p>
      </DoctorResume>
      <ConsultoryResume className="d-flex flex-row">
        <span>Consultory: </span>
        <p>
          {location}
          {' '}
        </p>
      </ConsultoryResume>
    </div>
    <div className="d-flex flex-row">
      <StartTimeResume className="d-flex flex-row">
        <span>Start Time: </span>
        <p>8:00 </p>
      </StartTimeResume>
      <EndTimeResume className="d-flex flex-row">
        <span>End Time: </span>
        <p>16:00</p>
      </EndTimeResume>
    </div>
  </ContentResume>
);

export default Resume;
