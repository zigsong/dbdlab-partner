import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getCategories = () => axios.get('/categories/', headers);
export const getCategiryItem = cId => axios.get(`/categories/${cId}/`, headers);
export const getItems = () => axios.get('/categories/items/', headers);
export const getItem = iId => axios.get(`/categories/items/${iId}/`, headers);
