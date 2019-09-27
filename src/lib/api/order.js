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
  is_tex_bill_requested: false,
}, headers);

export const patchVoucher = (company, companyRegistNum, email, vId, amount) => axios.patch(`${baseURL}/orders/voucher/${vId}/`, {
  voucher_amount: amount,
  is_tex_bill_requested: true,
  tex_bill_receive_email: email,
  tex_bill_company_name: company,
  company_registration_number: companyRegistNum,
}, headers);

export const orderTest = (pId, tId, cType, cCode) => axios.post(`${baseURL}/orders/test/`, {
  plan_id: pId,
  test_id: tId,
  coupon_type: cType,
  coupon_code: cCode,
  is_tex_bill_requested: false,
}, headers);

export const getTestOrder = oId => axios.get(`${baseURL}/orders/test/${oId}`, headers);
