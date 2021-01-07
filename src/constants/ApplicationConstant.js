const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

const urlencoded = new URLSearchParams();
urlencoded.append('grant_type', 'client_credentials');
urlencoded.append('client_id', 'woFiIDxrOp0EFGqgXfyhKJdpqzpoGKPD');
urlencoded.append('client_secret', 'yuEqJjBrDMut4d69');

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow',
};

export const BASE_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';

export const params = requestOptions;
