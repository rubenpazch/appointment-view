/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import toAbsoluteUrl from '../../../../helpers/assetsHelpers';

const Wrapper = styled.div` 
  margin: 0;
  padding: 0;
  background-color: purple;
  max-width: 400px;
  min-height: 450px;
`;

const Banner = prop => {
  // if (props.newProp) console.log(props.newProp)
  const bannerPosition = prop.contentPosition || 'left';
  const totalItems = prop.length || 3;
  const mediaLength = totalItems - 1;

  return (
    <Wrapper>
      <img
        alt="Logo"
        src={toAbsoluteUrl('/media/logos/logo.png')}
      />
      <h1>title</h1>
      <p>description</p>
      <ul>
        <li>
          <a href="www.google.com">
            <FontAwesomeIcon icon={faClock} />
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Banner;
