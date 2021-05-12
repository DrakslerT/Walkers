import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from './AccessToken';

const timeout = 60000; // ms

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tpo11-dogwalkers-server.herokuapp.com/api'
    : 'http://localhost:4000/api';

export const getAuthRequest = (): AxiosInstance => {
  let token = getAccessToken();
  return axios.create({
    baseURL: API_URL,
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const request = axios.create({
  baseURL: API_URL,
  timeout: timeout,
  withCredentials: true,
});
