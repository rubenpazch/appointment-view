/* eslint-disable no-unused-vars */
export default function setupAxios(axios) {
  axios.interceptors.request.use(request => request,
    error => Promise.reject(error));
  axios.interceptors.response.use(response => response,
    error => {
      const { status, data, config } = error.response;
      if (status === 500) {
        throw new Error(`${error.config.url} not found`);
      }
      if (status === 401) {
        throw new Error(`${error.config.url} not found`);
      }
      throw error;
    });
}
