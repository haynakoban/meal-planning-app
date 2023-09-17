import axios from 'axios';

export const SERVER_URL =
  'https://4834-119-111-231-142.ngrok.io' || process.env.SERVER_URL;

export default axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
});
