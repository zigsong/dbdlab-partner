import axios from 'axios';
import config from 'modules/config';

const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
const baseURL = config.REACT_APP_API_URL;
// const baseURL = '';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getCategories = () => axios.get(`${baseURL}/categories/`, headers);
export const getCategoryItem = cId => axios.get(`${baseURL}/categories/${cId}/`, headers);
export const getItems = () => axios.get(`${baseURL}/categories/items/`, headers);
export const getItem = iId => axios.get(`${baseURL}/categories/items/${iId}/`, headers);
