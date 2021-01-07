import getToken from './authAction';
import { BASE_URL, params } from '../../../../constants/ApplicationConstant';
// import { showAlertDanger } from '../actions/alert.actions';

const getTokenAsync = (email, password) => dispatch => {
  fetch(BASE_URL, params, email, password)
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('token', result.access_token);
      dispatch(getToken(result));
    })
    .catch(error => {
      console.log({ error });
    });
};

export default getTokenAsync;
