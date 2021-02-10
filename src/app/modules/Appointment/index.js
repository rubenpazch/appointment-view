/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import Title from './pages/Title';
import PrimarySearchAppBar from '../../../components/PrimarySearchAppBar';
import ListByPatient from './pages/ListByPatient';

const Wrapper = styled.div`
`;

const RigthContainer = styled.div` 
  min-height: 100vh;  
`;

const Appointment = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <PrimarySearchAppBar />
      <Wrapper className="container-fluid flex-nowrap">
        <div className="row flex-row flex-nowrap">
          <RigthContainer className="col-12">
            <Title />
            <ListByPatient />
          </RigthContainer>
        </div>
      </Wrapper>
    </>
  );
};

export default Appointment;
