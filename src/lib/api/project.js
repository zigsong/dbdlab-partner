import axios from 'axios';

const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
const baseURL = 'https://qa-server.realdopt.com/api';
// const baseURL = '';
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
