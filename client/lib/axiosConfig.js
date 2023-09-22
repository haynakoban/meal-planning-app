import axios from 'axios';

export const SERVER_URL =
  'https://7917-119-111-230-183.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
