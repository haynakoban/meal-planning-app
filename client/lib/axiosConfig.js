import axios from 'axios';

export const SERVER_URL =
  'https://7d3a-136-158-118-146.ngrok-free.app' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
