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

export const getPlanList = () => axios.get(`${baseURL}/plans/`, headers);
export const getPlan = planId => axios.get(`${baseURL}/plans/${planId}`, headers);
export const getPlanPrice = (pName, cNum) => axios.get(`${baseURL}/plans/calculate/?plan_name=${pName}&coupon_number=${cNum}`);
