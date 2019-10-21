import * as OrderAPI from 'lib/api/order';
import { handleActions } from 'redux-actions';

const GET_ORDER_VOUCHER_SUCCESS = 'order/GET_ORDER_VOUCHER_SUCCESS';
const GET_ORDER_VOUCHER_FAILURE = 'order/GET_ORDER_VOUCHER_FAILURE';
const POST_ORDER_VOUCHER_SUCCESS = 'order/POST_ORDER_VOUCHER_SUCCESS';
const POST_ORDER_VOUCHER_FAILURE = 'order/POST_ORDER_VOUCHER_FAILURE';
const PATCH_VOUCHER_SUCCESS = 'order/PATCH_VOUCHER_SUCCESS';
const PATCH_VOUCHER_FAILURE = 'order/PATCH_VOUCHER_FAILURE';
const GET_ORDER_VOUCHER_LIST_SUCCESS = 'order/GET_ORDER_VOUCHER_LIST_SUCCESS';
const GET_ORDER_VOUCHER_LIST_FAILURE = 'order/GET_ORDER_VOUCHER_LIST_FAILURE';
const POST_ORDER_TEST_SUCCESS = 'order/POST_ORDER_TEST_SUCCESS';
const POST_ORDER_TEST_FAILURE = 'order/POST_ORDER_TEST_FAILURE';
const GET_ORDER_TEST_SUCCESS = 'order/GET_ORDER_TEST_SUCCESS';
const GET_ORDER_TEST_FAILURE = 'order/GET_ORDER_TEST_FAILURE';
const GET_ORDER_TEST_LIST_SUCCESS = 'order/GET_ORDER_TEST_LIST_SUCCESS';
const GET_ORDER_TEST_LIST_FAILURE = 'order/GET_ORDER_TEST_LIST_FAILURE';
const PATCH_ORDER_TEST_SUCCESS = 'order/PATCH_ORDER_TEST_SUCCESS';
const PATCH_ORDER_TEST_FAILURE = 'order/PATCH_ORDER_TEST_FAILURE';
const PATCH_TEST_TAX_BILL_SUCCESS = 'order/PATCH_TEST_TAX_BILL_SUCCESS';
const PATCH_TEST_TAX_BILL_FAILURE = 'order/PATCH_TEST_TAX_BILL_FAILURE';
const PATCH_VOUCHER_TAX_BILL_SUCCESS = 'order/PATCH_VOUCHER_TAX_BILL_SUCCESS';
const PATCH_VOUCHER_TAX_BILL_FAILURE = 'order/PATCH_VOUCHER_TAX_BILL_FAILURE';

export const getVoucherOrder = oId => dispatch => (
  OrderAPI.getVoucherOrder(oId).then((res) => {
    dispatch({
      type: GET_ORDER_VOUCHER_SUCCESS,
      payload: res,
    });
  }).catch((err) => {
    dispatch({
      type: GET_ORDER_VOUCHER_FAILURE,
      payload: err,
    });
  })
);

export const getVoucherOrderList = () => dispatch => (
  OrderAPI.getVoucherOrderList().then((res) => {
    dispatch({
      type: GET_ORDER_VOUCHER_LIST_SUCCESS,
      payload: res,
    });
  }).catch((err) => {
    dispatch({
      type: GET_ORDER_VOUCHER_LIST_FAILURE,
      payload: err,
    });
  })
);

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
    dispatch({
      type: POST_ORDER_VOUCHER_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
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
  hasTaxBillReq,
) => dispatch => OrderAPI.patchVoucher(
  company,
  companyRegistNum,
  email,
  vId,
  amount,
  hasTaxBillReq,
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

export const getTestOrderList = () => dispatch => OrderAPI.getTestOrderList().then((res) => {
  dispatch({
    type: GET_ORDER_TEST_LIST_SUCCESS,
    payload: res,
  });
}).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
  dispatch({
    type: GET_ORDER_VOUCHER_FAILURE,
    payload: err,
  });
});

export const getTestOrder = oId => dispatch => OrderAPI.getTestOrder(oId).then(
  (res) => {
    dispatch({
      type: GET_ORDER_TEST_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  dispatch({
    type: GET_ORDER_TEST_FAILURE,
    payload: err,
  });
});

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
) => dispatch => new Promise((resolve, reject) => OrderAPI.patchTestOrder(
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
).then(
  (res) => {
    dispatch({
      type: PATCH_ORDER_TEST_SUCCESS,
      payload: res,
    });
    resolve(res);
  },
).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
  dispatch({
    type: PATCH_ORDER_TEST_FAILURE,
    payload: err,
  });
  reject(err);
}));

export const patchTestTaxBill = (
  oId,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
) => dispatch => OrderAPI.patchTestTaxBill(
  oId,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
).then(
  (res) => {
    dispatch({
      type: PATCH_TEST_TAX_BILL_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
  dispatch({
    type: PATCH_TEST_TAX_BILL_FAILURE,
    payload: err,
  });
});

export const patchVoucherTaxBill = (
  oId,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
) => dispatch => OrderAPI.patchVoucherTaxBill(
  oId,
  hasTaxBillReq,
  taxEmail,
  taxCompany,
  taxCompanyRegistNum,
).then(
  (res) => {
    dispatch({
      type: PATCH_VOUCHER_TAX_BILL_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
  dispatch({
    type: PATCH_VOUCHER_TAX_BILL_FAILURE,
    payload: err,
  });
});

const initialState = {
  getVoucherListSuccess: false,
  getVoucherListFailure: false,
  getVoucherSuccess: false,
  getVoucherFailure: false,
  postVoucherSuccess: false,
  postVoucherFailure: false,
  postTestSuccess: false,
  postTestFailure: false,
  getTestListSuccess: false,
  getTestListFailure: false,
  getTestSuccess: false,
  getTestFailure: false,
  voucherList: [],
  testList: [],
  voucher: {},
  test: {},
};

export default handleActions({
  [GET_ORDER_VOUCHER_LIST_SUCCESS]: (state, action) => ({
    ...state,
    getVoucherListSuccess: true,
    voucherList: action.payload.data.results,
  }),
  [GET_ORDER_VOUCHER_LIST_FAILURE]: state => ({
    ...state,
    getVoucherListFailure: true,
  }),
  [GET_ORDER_VOUCHER_SUCCESS]: (state, action) => ({
    ...state,
    getVoucherSuccess: true,
    voucher: action.payload.data,
  }),
  [GET_ORDER_VOUCHER_FAILURE]: state => ({
    ...state,
    getVoucherFailure: true,
  }),
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
  [GET_ORDER_TEST_LIST_SUCCESS]: (state, action) => ({
    ...state,
    getTestListSuccess: true,
    testList: action.payload.data.results,
  }),
  [GET_ORDER_TEST_LIST_FAILURE]: state => ({
    ...state,
    getTestListFailure: true,
  }),
  [GET_ORDER_TEST_SUCCESS]: (state, action) => ({
    ...state,
    getTestSuccess: true,
    test: action.payload.data,
  }),
  [GET_ORDER_TEST_FAILURE]: state => ({
    ...state,
    getTestFailure: true,
  }),
  [PATCH_ORDER_TEST_SUCCESS]: (state, action) => ({
    ...state,
    postTestSuccess: true,
    test: action.payload.data,
  }),
  [PATCH_ORDER_TEST_FAILURE]: state => ({
    ...state,
    postTestFailure: true,
  }),
  [PATCH_TEST_TAX_BILL_SUCCESS]: state => ({
    ...state,
    postTestSuccess: true,
  }),
  [PATCH_TEST_TAX_BILL_FAILURE]: state => ({
    ...state,
    postTestFailure: true,
  }),
  [PATCH_VOUCHER_TAX_BILL_SUCCESS]: state => ({
    ...state,
    postTestSuccess: true,
  }),
  [PATCH_VOUCHER_TAX_BILL_FAILURE]: state => ({
    ...state,
    postTestFailure: true,
  }),
}, initialState);
