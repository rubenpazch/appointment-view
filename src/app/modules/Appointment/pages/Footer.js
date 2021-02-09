import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.div` 
  min-height: 10vh;
  height: 10vh;
  
  ul {    
    list-style-type: none;    
  }
  li {

  }
`;

const Footer = () => (
  <div>
    <FooterContainer className="d-flex flex-column justify-content-center align-items-center">
      <ul className="d-flex flex-row m-0 p-0 justify-content-center">
        <li className="p-2">
          <FontAwesomeIcon icon={faClock} />
        </li>
        <li className="p-2">
          <FontAwesomeIcon icon={faClock} />
        </li>
        <li className="p-2">
          <FontAwesomeIcon icon={faClock} />
        </li>
      </ul>
      <ul className="d-flex flex-row m-0 p-0 justify-content-center">
        <li className="p-2">
          <span>Texto footer</span>
        </li>
      </ul>
    </FooterContainer>
  </div>
);

export default Footer;
