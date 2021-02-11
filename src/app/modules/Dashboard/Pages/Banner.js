/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import BannerItem from './BannerItem';

const Wrapper = styled.div`  
  max-width: 100%;
  min-height: 450px;
`;

const Banner = ({ item }) => (
  <Wrapper className="m-0 px-5">
    <BannerItem doctorcalendars={item} />
  </Wrapper>
);

Banner.propTypes = {
  item: PropTypes.any,
};

Banner.defaultProps = {
  item: null,
};

export default Banner;
