import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const baseURL = 'http://qa-server.realdopt.com/api';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getTest = tId => axios.get(`${baseURL}/tests/${tId}/`, headers);
export const getTestList = pId => axios.get(`${baseURL}/tests/?project_id=${pId}`, headers);
export const postTest = (
  id,
  title,
  clientName,
  clientContact,
  media2Value,
  email,
  mediaValue,
  serviceFormatValue,
  serviceInfo,
  serviceCategory,
  serviceStatus,
  serviceDesc,
  funnel,
) => axios.post(`${baseURL}/tests/`, {
  project_id: id,
  title,
  client_name: clientName,
  client_phone_number: clientContact,
  client_email: email,
  media_category_1: mediaValue,
  media_category_2: media2Value,
  service_extra_info: serviceInfo,
  service_category: serviceCategory,
  service_format: serviceFormatValue,
  service_description: serviceDesc,
  service_status: serviceStatus,
  funnel,
}, headers);
export const patchTest = (
  tId,
  pId,
  title,
  clientName,
  clientContact,
  media2,
  email,
  media1,
  serviceFormat,
  serviceInfo,
  serviceCategory,
  serviceStatus,
  serviceDesc,
  funnel,
  registerValue,
) => axios.patch(`${baseURL}/tests/${tId}/`, {
  project_id: pId,
  title,
  client_name: clientName,
  client_phone_number: clientContact,
  client_email: email,
  media_category_1: media1,
  media_category_2: media2,
  service_extra_info: serviceInfo,
  service_category: serviceCategory,
  service_format: serviceFormat,
  service_description: serviceDesc,
  service_status: serviceStatus,
  funnel,
  is_register_required: registerValue,
}, headers);
