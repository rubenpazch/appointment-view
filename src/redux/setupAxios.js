/* eslint-disable no-param-reassign */
export default function setupAxios(axios) {
  axios.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
      return Promise.reject(error.response);
    }
    return error;
  });
}
