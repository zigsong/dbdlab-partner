import * as OrderAPI from 'lib/api/order';
import { handleActions } from 'redux-actions';

const POST_ORDER_VOUCHER_SUCCESS = 'order/POST_ORDER_VOUCHER_SUCCESS';
const POST_ORDER_VOUCHER_FAILURE = 'order/POST_ORDER_VOUCHER_FAILURE';
const PATCH_VOUCHER_SUCCESS = 'order/PATCH_VOUCHER_SUCCESS';
const PATCH_VOUCHER_FAILURE = 'order/PATCH_VOUCHER_FAILURE';
const POST_ORDER_TEST_SUCCESS = 'order/POST_ORDER_TEST_SUCCESS';
const POST_ORDER_TEST_FAILURE = 'order/POST_ORDER_TEST_FAILURE';

export const orderVoucher = (
  companyName,
  applicantName,
  depositorName,
  phone,
  email,
  plId,
  amount,
) => dispatch => OrderAPI.orderVoucher(
  companyName,
  applicantName,
  depositorName,
  phone,
  email,
  plId,
  amount,
).then(
  (res) => {
    console.log(res);
    dispatch({
      type: POST_ORDER_VOUCHER_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  dispatch({
    type: POST_ORDER_VOUCHER_FAILURE,
    payload: err,
  });
});

export const patchVoucher = (
  company,
  companyRegistNum,
  email,
  vId,
  amount,
) => dispatch => OrderAPI.patchVoucher(
  company,
  companyRegistNum,
  email,
  vId,
  amount,
).then(
  (res) => {
    dispatch({
      type: PATCH_VOUCHER_SUCCESS,
      payload: res,
    });
  },
).catch(
  (err) => {
    dispatch({
      type: PATCH_VOUCHER_FAILURE,
      payload: err,
    });
  },
);

export const orderTest = (
  pId,
  tId,
  cType,
  cCode,
) => dispatch => new Promise((resolve, reject) => OrderAPI.orderTest(
  pId,
  tId,
  cType,
  cCode,
).then(
  (res) => {
    console.log(res);
    dispatch({
      type: POST_ORDER_TEST_SUCCESS,
      payload: res,
    });
    resolve(res);
  },
).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
  dispatch({
    type: POST_ORDER_TEST_FAILURE,
    payload: err,
  });
  reject(err);
}));

const initialState = {
  getVoucherListSuccess: false,
  getVoucherListFailure: false,
  getVoucherSuccess: false,
  getVoucherFailure: false,
  postVoucherSuccess: false,
  postVoucherFailure: false,
  postTestSuccess: false,
  postTestFailure: false,
  voucher: {},
  test: {},
};

export default handleActions({
  [POST_ORDER_VOUCHER_SUCCESS]: (state, action) => ({
    ...state,
    postVoucherSuccess: true,
    voucher: action.payload.data,
  }),
  [POST_ORDER_VOUCHER_FAILURE]: state => ({
    ...state,
    postVoucherFailure: true,
  }),
  [PATCH_VOUCHER_SUCCESS]: (state, action) => ({
    ...state,
    postVoucherSuccess: true,
    voucher: action.payload.data,
  }),
  [PATCH_VOUCHER_FAILURE]: state => ({
    ...state,
    postVoucherFailure: true,
  }),
  [POST_ORDER_TEST_SUCCESS]: (state, action) => ({
    ...state,
    postTestSuccess: true,
    test: action.payload.data,
  }),
  [POST_ORDER_TEST_FAILURE]: state => ({
    ...state,
    postTestFailure: true,
  }),
}, initialState);
