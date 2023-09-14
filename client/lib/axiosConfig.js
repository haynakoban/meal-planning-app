import axios from 'axios';

export const SERVER_URL =
  'https://92f5-49-150-108-243.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
