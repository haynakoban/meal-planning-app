import axios from 'axios';

export const SERVER_URL =
  'https://e14e-49-150-108-243.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
