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
  step,
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
  step,
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
export const getTestPrice = (tId, pName) => axios.get(`${baseURL}/tests/${tId}/calculate/?plan_name=${pName}`, headers);
