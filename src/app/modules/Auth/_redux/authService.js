import getToken from './authAction';
// import { BASE_URL, params } from '../../../../constants/ApplicationConstant';
// import { showAlertDanger } from '../actions/alert.actions';

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const getTokenAsync = (email, password) => dispatch => {
  // fetch(BASE_URL, params, email, password)
  //   .then(response => response.json())
  //   .then(result => {
  //     localStorage.setItem('token', result.access_token);
  //     dispatch(getToken(result));
  //   })
  //   .catch(error => {
  //     console.log({ error });
  //   });
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  dispatch(getToken('result'));
  fetch('https://vast-tundra-77982.herokuapp.com/api/v1/users', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export default getTokenAsync;
