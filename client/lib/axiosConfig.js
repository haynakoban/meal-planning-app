import axios from 'axios';

export const SERVER_URL =
  'https://b297-119-111-231-142.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
