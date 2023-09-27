import api from 'axios';

export const SERVER_URL =
  'https://7785-119-111-230-183.ngrok.io' || process.env.SERVER_URL;

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
