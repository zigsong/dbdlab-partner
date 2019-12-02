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

// eslint-disable-next-line import/prefer-default-export
export const getVoucherOrderList = () => axios.get(`${baseURL}/orders/voucher/`, headers);
export const getVoucherOrder = oId => axios.get(`${baseURL}/orders/voucher/${oId}/`, headers);
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

export const patchVoucher = (
  company,
  companyRegistNum,
  email,
  vId,
  amount,
  hasTaxBillReq,
) => axios.patch(`${baseURL}/orders/voucher/${vId}/`, {
  voucher_amount: amount,
  is_tax_bill_requested: hasTaxBillReq,
  tax_bill_receive_email: email,
  tax_bill_company_name: company,
  company_registration_number: companyRegistNum,
}, headers);

export const orderTest = (pId, tId, cType, cCode) => axios.post(`${baseURL}/orders/test/`, {
  plan_id: pId,
  test_id: tId,
  coupon_type: cType,
  coupon_code: cCode,
  is_tex_bill_requested: false,
}, headers);

export const patchTestOrder = (
  oId,
  cCode,
  cType,
  planName,
  planDesc,
  originPrice,
  discountedPrice,
  totalPrice,
  isPaid,
  paidDate,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
) => axios.patch(`${baseURL}/orders/test/${oId}/`, {
  plan: {
    name: planName,
    description: planDesc,
  },
  coupon: {
    code: cCode,
    coupon_type: cType,
  },
  coupon_type: cType,
  ordered_price: originPrice,
  discounted_price: discountedPrice,
  charged_price: totalPrice,
  is_paid: isPaid,
  paid_at: paidDate,
  is_tax_bill_requested: hasTaxBillReq,
  tax_bill_receive_email: taxEmail,
  tax_bill_company_name: taxCompany,
  company_registration_number: taxCompanyRegistNum,
}, headers);
export const getTestOrderList = () => axios.get(`${baseURL}/orders/test/`, headers);
export const getTestOrder = oId => axios.get(`${baseURL}/orders/test/${oId}/`, headers);
export const patchTestTaxBill = (
  oId,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
) => axios.patch(`${baseURL}/orders/test/${oId}/tax_bill/`, {
  is_tax_bill_requested: hasTaxBillReq,
  tax_bill_receive_email: taxEmail,
  tax_bill_company_name: taxCompany,
  company_registration_number: taxCompanyRegistNum,
}, headers);
export const patchVoucherTaxBill = (
  oId,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
) => axios.patch(`${baseURL}/orders/voucher/${oId}/tax_bill/`, {
  is_tax_bill_requested: hasTaxBillReq,
  tax_bill_receive_email: taxEmail,
  tax_bill_company_name: taxCompany,
  company_registration_number: taxCompanyRegistNum,
}, headers);
