import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const baseURL = 'https://qa-server.realdopt.com/api';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const getAuthSelf = () => axios.get(`${baseURL}/accounts/auth/self/`, headers);
