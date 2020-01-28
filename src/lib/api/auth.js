import axios from 'axios';
import config from 'modules/config';

const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') >= 0);
const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
const baseURL = config.REACT_APP_API_URL;
// const baseURL = '';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const getAuthSelf = () => axios.get(`${baseURL}/accounts/auth/self/`, headers);
export const getAccount = id => axios.get(`${baseURL}/accounts/${id}/`, headers);
export const postAvatarUpdate = file => axios.post(`${baseURL}/accounts/self/avatar/`, file, headers);
export const patchAccountUpdate = (id, email, name, phone) => axios.patch(`${baseURL}/accounts/${id}/`, {
  email,
  name,
  phone_number: phone,
}, headers);
export const putPasswordUpdate = (email, currentPw, nextPw) => axios.put(`${baseURL}/accounts/self/password/`, {
  is_staff: false,
  email,
  password: currentPw,
  new_password: nextPw,
}, headers);
