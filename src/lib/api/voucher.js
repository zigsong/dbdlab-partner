import axios from 'axios';

const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
const AUTH_TOKEN = hasTokenCookie !== undefined ? hasTokenCookie.replace(/\s/gi, '').substring(6) : null;
const baseURL = 'https://qa-server.realdopt.com/api';
// const baseURL = '';
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${AUTH_TOKEN}`,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const orderVoucher = (companyName, applicantName, depositorName, phone, email, plId, amount) => axios.post(`${baseURL}/orders/voucher/`, {
  company_name: companyName,
  applicant_name: applicantName,
  depositor_name: depositorName,
  phone_number: phone,
  voucher_receive_email: email,
  plan_id: plId,
  voucher_amount: amount,
}, headers);
