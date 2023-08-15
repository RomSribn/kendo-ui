import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://deverpapi.mtillholdings.com/ERPAPI',
  headers: {
    'Content-Type': 'application/json',
  },
});
