import api from 'axios';

export const SERVER_URL =
  'https://meal-planning-server-43a3a89f3caa.herokuapp.com';

const axios = api.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});

const addTimestampToRequest = (config) => {
  const uniqueQueryParameter = `timestamp=${new Date().getTime()}`;
  config.url += config.url.includes('?')
    ? `&${uniqueQueryParameter}`
    : `?${uniqueQueryParameter}`;
  return config;
};

axios.interceptors.request.use(addTimestampToRequest);

export default axios;
