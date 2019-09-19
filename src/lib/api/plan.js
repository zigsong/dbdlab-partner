import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const baseURL = 'http://qa-server.realdopt.com/api';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getPlanList = () => axios.get(`${baseURL}/plans/`, headers);
export const getPlan = planId => axios.get(`${baseURL}/plans/${planId}`, headers);
