/* eslint-disable no-unused-vars */
export default function setupAxios(axios) {
  axios.interceptors.request.use(request => {
    console.log({ request });
    return request;
  },
  error => {
    console.log({ error });
    return Promise.reject(error);
  });
  axios.interceptors.response.use(response => {
    console.log('it is response', { response });
    return response;
  },
  error => {
    // console.log('response', { error });
    const { status, data, config } = error.response;
    if (status === 500) {
      // console.log('error 500');
      // return error;
      throw new Error(`${error.config.url} not found`);
    }
    if (status === 401) {
      // console.log('not authorized');
      throw new Error(`${error.config.url} not found`);
    }
    // return Promise.reject(error);
    throw error;
  });
}
