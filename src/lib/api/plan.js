import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getPlanList = () => axios.get('/plans/', headers);
export const getPlan = planId => axios.get(`/plans/${planId}`, headers);
