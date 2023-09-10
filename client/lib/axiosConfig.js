import axios from 'axios';

export const SERVER_URL =
  'https://3ec0-49-150-98-37.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
