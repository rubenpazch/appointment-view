/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import BannerItem from './BannerItem';

const Wrapper = styled.div`  
  max-width: 100%;
  min-height: 450px;
`;

const Banner = prop => {
  const { item } = prop;
  return (
    <Wrapper className="m-0 px-5">
      <BannerItem doctorcalendars={item} />
    </Wrapper>
  );
};

export default Banner;
