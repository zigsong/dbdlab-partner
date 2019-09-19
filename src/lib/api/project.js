import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const baseURL = 'http://qa-server.realdopt.com/api';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getProjectList = () => axios.get(`${baseURL}/projects/`, headers);
export const getProject = id => axios.get(`${baseURL}/projects/${id}/`, headers);
export const putProject = ({ company, service }) => axios.post(`${baseURL}/projects/`, {
  company_name: company,
  name: service,
}, headers);
