import axios from 'axios';

export const SERVER_URL =
  'https://0123-49-150-99-156.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
