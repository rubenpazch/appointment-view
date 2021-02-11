import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ContentResume = styled.div`
  padding: 5px;
  margin: 15px 0 10px 15px;
  min-height: 100%;
  max-width: 100%;
  width: 70%;
  border-radius: 5px;  
  height: 50px;

  span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #000000;
    min-width: 70px;
  }
`;

const DoctorResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    font-size: 0.8rem;
    margin: 0;
  }
`;

const ConsultoryResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    font-size: 0.8rem;
    margin: 0;
  }
`;

const StartTimeResume = styled.div`
  padding: 0;
  margin: 0;
  min-width: 50%;

  p {
    padding: 0;
    font-size: 0.8rem;
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
    font-size: 0.8rem;
  }
`;

const Resume = ({
  doctorName, location, startTime, endTime,
}) => (
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
        </p>
      </ConsultoryResume>
    </div>
    <div className="d-flex flex-row">
      <StartTimeResume className="d-flex flex-row">
        <span>Start Time: </span>
        <p>
          {startTime}
        </p>
      </StartTimeResume>
      <EndTimeResume className="d-flex flex-row">
        <span>End Time: </span>
        <p>{endTime}</p>
      </EndTimeResume>
    </div>
  </ContentResume>
);

Resume.propTypes = {
  doctorName: PropTypes.string,
  location: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};

Resume.defaultProps = {
  doctorName: '',
  location: '',
  startTime: '',
  endTime: '',
};

export default Resume;
