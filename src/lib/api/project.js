import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getProjectList = () => axios.get('/projects/', headers);
export const getProject = id => axios.get(`/projects/${id}/`, headers);
export const putProject = ({ company, service }) => axios.post('/projects/', {
  company_name: company,
  name: service,
}, headers);
