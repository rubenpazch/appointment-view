import * as actionsTypes from './authTypes';

const getToken = result => ({
  type: actionsTypes.FETCH_TOKEN_SUCCESS,
  token: result,
});

export default getToken;
