import axios from 'axios';

const AUTH_TOKEN = localStorage.getItem('token') || sessionStorage.getItem('token');
const baseURL = 'http://qa-server.realdopt.com/api';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

export const getTargetList = tId => axios.get(`${baseURL}/targets/?test__id=${tId}`, headers);
export const getTarget = tgId => axios.get(`${baseURL}/targets/${tgId}`, headers);
export const postTarget = (tId, genderValue, minAge, maxAge) => axios.post(`${baseURL}/targets/`, {
  test_id: tId,
  age_minimum: minAge,
  age_maximum: maxAge,
  gender: genderValue,
}, headers);
export const patchTarget = (tgId, tId, gender, minAge, maxAge) => axios.patch(`${baseURL}/targets/${tgId}/`, {
  id: tgId,
  test_id: tId,
  age_minimum: minAge,
  age_maximum: maxAge,
  gender,
}, headers);
