import axios from 'axios';

const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = '';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getProjectList = () => axios.get(`${baseURL}/projects/`, headers);
export const getProject = (id, token) => axios.get(`${baseURL}/projects/${id}/${token}`, headers);
export const putProject = ({ company, service }) => axios.post(`${baseURL}/projects/`, {
  company_name: company,
  name: service,
}, headers);
export const patchProject = (
  id,
  service,
  company,
  serviceInfo,
  serviceCategory,
  serviceFormat,
  serviceDesc,
) => axios.patch(`${baseURL}/projects/${id}/`, {
  company_name: company,
  name: service,
  service_extra_info: serviceInfo,
  service_category: serviceCategory,
  service_format: serviceFormat,
  service_description: serviceDesc,
}, headers);
export const inviteProject = (id, email) => axios.post(`${baseURL}/projects/${id}/invite/`, {
  email_list: email,
}, headers);
export const banProject = (id, email) => axios.delete(`${baseURL}/projects/${id}/ban/`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${AUTH_TOKEN}`,
    },
    data: {
      email_list: email,
    },
  });
export const getProjectInviteLink = id => axios.get(`${baseURL}/projects/${id}/invite_link/`, headers);
