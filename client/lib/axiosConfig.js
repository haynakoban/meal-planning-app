import axios from 'axios';

export const SERVER_URL =
  'https://64ac-119-111-231-142.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
