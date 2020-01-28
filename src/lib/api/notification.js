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
export const getNotifications = () => axios.get(`${baseURL}/notifications/`, headers);
