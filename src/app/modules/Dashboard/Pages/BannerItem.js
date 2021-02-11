/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { useRouteMatch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faPhoneSquareAlt, faAddressBook, faHeart, faPhotoVideo,
} from '@fortawesome/free-solid-svg-icons';

import toAbsoluteUrl from '../../../../helpers/assetsHelpers';

const Wrapper = styled.div`   
  min-width: 100%;
  min-height: 450px;  
`;
const ImageContainer = styled.div` 
  margin: 0;
  padding: 0;
  background-image: url('${props => props.imagelink}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 250px;
  height: 250px;
  border-radius: 45px;
`;

const TitleContainer = styled.div` 
  h2 {
    font-size: 1rem;
    text-align: center;
    text-transform: uppercase;
    max-width: 250px;
  }
`;

const DetailsContainer = styled.div`  
  ul {
    list-style-type: none;
    li {
      font-size: 0.9rem;
      width: 100%;      
      span {        
        width: 120px;
        font-weight: 800;
      }
      p {
        max-width: 130px;
      }
    }
  }  
`;

const SocialMediaContainer = styled.div` 
  ul {
    list-style-type: none;
    li {
      width: 100%;     
    }
  }
`;

const WrapperCalendarDetails = styled.div` 
  margin: 0;
  padding: 0;
`;

const BannerItem = ({ doctorcalendars }) => {
  const { url } = useRouteMatch();
  return (
    <Wrapper className="row">
      {
        doctorcalendars.map(item => (
          <WrapperCalendarDetails className="col-4 d-flex flex-column justify-content-center align-items-center" key={item.id}>
            <Link
              to={`${url}/${item.relationships.person.data.firstName.replace(/ /g, '_')}_${item.relationships.person.data.lastName.replace(/ /g, '_')}?id=${item.attributes.id}&user_id=${item.attributes.user_id}`}
            >
              <ImageContainer imagelink={toAbsoluteUrl(`${item.attributes.linkImage}`)} />
            </Link>
            <TitleContainer className="p-3">
              <h2>
                <a href="www.google.com">
                  {`Dr. ${item.relationships.person.data.firstName} ${item.relationships.person.data.lastName} `}
                </a>
              </h2>
            </TitleContainer>
            <DetailsContainer>
              <ul className="p-0 m-0">
                <li className="p-0 d-flex flex-row justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faClock} />
                  <span className="pl-2 pr-2">Start Time: </span>
                  <p className="p-0 m-0">{moment.utc(item.attributes.startTime).format('HH:mm')}</p>
                </li>
                <li className="px-0 py-1 d-flex flex-row justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faClock} />
                  <span className="pl-2 pr-2">End Time: </span>
                  <p className="p-0 m-0">{moment.utc(item.attributes.endTime).format('HH:mm')}</p>
                </li>
                <li className="px-0 py-1 d-flex flex-row justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faPhoneSquareAlt} />
                  <span className="pl-2 pr-2">Phone Number: </span>
                  <p className="p-0 m-0">{item.relationships.person.data.phone}</p>
                </li>
                <li className="px-0 py-1 d-flex flex-row justify-content-start align-items-start">
                  <FontAwesomeIcon icon={faPhoneSquareAlt} />
                  <span className="pl-2 pr-2">Department Number: </span>
                  <p className="p-0 m-0">{item.relationships.department.data.contactNumber}</p>
                </li>
                <li className="px-0 py-1 d-flex flex-row justify-content-start align-items-start">
                  <FontAwesomeIcon icon={faAddressBook} />
                  <span className="pl-2 pr-2">Consultory: </span>
                  <p className="p-0 m-0">{item.relationships.department.data.location}</p>
                </li>
              </ul>
            </DetailsContainer>
            <SocialMediaContainer>
              <ul className="row p-4 m-0">
                <li className="col p-2 d-flex flex-row justify-content-start align-items-center">
                  <a href="www.google.com">
                    <FontAwesomeIcon icon={faHeart} />
                  </a>
                </li>
                <li className="col p-2 d-flex flex-row justify-content-start align-items-center">
                  <a href="www.google.com">
                    <FontAwesomeIcon icon={faPhotoVideo} />
                  </a>
                </li>
                <li className="col p-2 d-flex flex-row justify-content-start align-items-center">
                  <a href="www.google.com">
                    <FontAwesomeIcon icon={faPhotoVideo} />
                  </a>
                </li>
              </ul>
            </SocialMediaContainer>
          </WrapperCalendarDetails>
        ))
      }
    </Wrapper>
  );
};

BannerItem.propTypes = {
  doctorcalendars: PropTypes.any,
};

BannerItem.defaultProps = {
  doctorcalendars: null,
};

export default BannerItem;
