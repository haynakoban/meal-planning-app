import axios from 'axios';

export const SERVER_URL =
  'https://338b-49-150-111-69.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
