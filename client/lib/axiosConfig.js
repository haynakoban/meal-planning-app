import axios from 'axios';

export const SERVER_URL =
  'https://9911-119-111-225-37.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
