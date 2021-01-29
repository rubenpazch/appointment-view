/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@material-ui/core';
import Banner from './Banner';

const Wrapper = styled.div`  
  width: 100%;
  height: 100%;
  background-color: red;
`;

const items = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Random Name #2',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #3',
    description: 'Hello World 2020!',
  },
];

function Item({ item }) {
  return (
    <Paper>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <button className="CheckButton" type="button">
        Check it out!
      </button>
    </Paper>
  );
}

const CalendarCarrusel = () => {
  const itemmm = {
    Name: 'Electronics',
    Caption: 'Electrify your friends!',
    contentPosition: 'left',
    Items: [
      {
        Name: 'Macbook Pro',
        Image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80',
      },
      {
        Name: 'iPhone',
        Image: 'https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
    ],
  };

  return (
    <Wrapper className="m-0 p-0">
      <Banner contentPosition="left" length={3} item={itemmm} />
    </Wrapper>
  );
};

export default CalendarCarrusel;
