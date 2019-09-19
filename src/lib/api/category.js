import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const baseURL = 'https://qa-server.realdopt.com/api';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getCategories = () => axios.get(`${baseURL}/categories/`, headers);
export const getCategiryItem = cId => axios.get(`${baseURL}/categories/${cId}/`, headers);
export const getItems = () => axios.get(`${baseURL}/categories/items/`, headers);
export const getItem = iId => axios.get(`${baseURL}/categories/items/${iId}/`, headers);
