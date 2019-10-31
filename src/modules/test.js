/* eslint-disable camelcase */
import * as TestAPI from 'lib/api/test';
import { handleActions } from 'redux-actions';

const SET_INIT = 'test/SET_INIT';
const SET_INIT_LIST = 'test/SET_INIT_LIST';
const GET_TEST_LIST_SUCCESS = 'test/GET_TEST_LIST_SUCCESS';
const GET_TEST_LIST_FAILURE = 'test/GET_TEST_LIST_FAILURE';
const POST_TEST_SUCCESS = 'test/POST_TEST_SUCCESS';
const POST_TEST_FAILURE = 'test/POST_TEST_FAILURE';
const GET_TEST_SUCCESS = 'test/GET_TEST_SUCCESS';
const GET_TEST_FAILURE = 'test/GET_TEST_FAILURE';
const PATCH_TEST_SUCCESS = 'test/PATCH_TEST_SUCCESS';
const PATCH_TEST_FAILURE = 'test/PATCH_TEST_FAILURE';
const GET_TEST_PRICE_SUCCESS = 'test/GET_TEST_PRICE_SUCCESS';
const GET_TEST_PRICE_FAILURE = 'test/GET_TEST_PRICE_FAILURE';

export const setTestInit = () => ({ type: SET_INIT });

export const setTestListInit = () => ({ type: SET_INIT_LIST });

export const getTestList = pId => dispatch => (
  new Promise((resolve, reject) => {
    TestAPI.getTestList(pId).then(
      (res) => {
        dispatch({
          type: GET_TEST_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      dispatch({
        type: GET_TEST_LIST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const getTest = tId => dispatch => (
  new Promise((resolve, reject) => {
    TestAPI.getTest(tId).then(
      (res) => {
        dispatch({
          type: GET_TEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      dispatch({
        type: GET_TEST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const postTest = (
  id,
  step,
  title,
  clientName,
  clientContact,
  media2,
  email,
  media1,
  serviceFormat,
  serviceInfo,
  serviceCategory,
  serviceStatus,
  serviceDesc,
  funnel,
) => dispatch => (
  new Promise((resolve, reject) => {
    TestAPI.postTest(
      id,
      step,
      title,
      clientName,
      clientContact,
      media2,
      email,
      media1,
      serviceFormat,
      serviceInfo,
      serviceCategory,
      serviceStatus,
      serviceDesc,
      funnel,
    ).then(
      (res) => {
        dispatch({
          type: POST_TEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.message);
      console.log(err.response);
      dispatch({
        type: POST_TEST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const patchTest = (
  tId,
  pId,
  step,
  title,
  clientName,
  clientContact,
  media2,
  email,
  media1,
  serviceFormat,
  serviceInfo,
  serviceCategory,
  serviceStatus,
  serviceDesc,
  funnel,
  registerValue,
) => dispatch => (
  new Promise((resolve, reject) => {
    TestAPI.patchTest(
      tId,
      pId,
      step,
      title,
      clientName,
      clientContact,
      media2,
      email,
      media1,
      serviceFormat,
      serviceInfo,
      serviceCategory,
      serviceStatus,
      serviceDesc,
      funnel,
      registerValue,
    ).then(
      (res) => {
        dispatch({
          type: PATCH_TEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.message);
      console.log(err.response);
      dispatch({
        type: PATCH_TEST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const getTestPrice = (tId, pName, couponValue) => dispatch => (
  new Promise((resolve, reject) => {
    TestAPI.getTestPrice(tId, pName, couponValue)
      .then((res) => {
        dispatch({
          type: GET_TEST_PRICE_SUCCESS,
          payload: res,
        });
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        console.log(err.response);
        dispatch({
          type: GET_TEST_PRICE_FAILURE,
          payload: err,
        });
        reject(err);
      });
  })
);

const initialState = {
  getSuccess: false,
  getFailure: false,
  postSuccess: false,
  postFailure: false,
  count: 0,
  next: '',
  previous: '',
  testList: {},
  test: {},
  targets: {},
  quests: {},
  testPrice: {},
};

export default handleActions({
  [SET_INIT]: state => ({
    ...state,
    test: {},
  }),
  [SET_INIT_LIST]: state => ({
    ...state,
    testList: {},
  }),
  [GET_TEST_LIST_SUCCESS]: (state, action) => {
    const {
      count, next, previous, results,
    } = action.payload.data;
    return {
      ...state,
      getSuccess: true,
      getPending: false,
      count,
      next,
      previous,
      testList: {
        ...results,
      },
    };
  },
  [GET_TEST_LIST_FAILURE]: state => ({
    ...state,
    getPending: false,
    getFailure: true,
  }),
  [GET_TEST_SUCCESS]: (state, action) => {
    const {
      id,
      title,
      step,
      client_name,
      client_phone_number,
      client_email,
      media_category_1,
      media_category_2,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      service_status,
      funnel,
      staff,
      project_id,
      create_user_id,
      created_at,
      targets,
      quests,
      is_register_required,
      order,
    } = action.payload.data;

    return {
      ...state,
      getTestPending: false,
      test: {
        id,
        title,
        step,
        client_name,
        client_phone_number,
        client_email,
        media_category_1,
        media_category_2,
        service_extra_info,
        service_category,
        service_format,
        service_description,
        service_status,
        funnel,
        staff,
        project_id,
        create_user_id,
        created_at,
        is_register_required,
        order,
      },
      targets: {
        targets,
      },
      quests: {
        quests,
      },
    };
  },
  [GET_TEST_FAILURE]: state => ({
    ...state,
    getFailure: true,
  }),
  [POST_TEST_SUCCESS]: (state, action) => {
    const { testList } = state;
    const {
      id,
      title,
      step,
      client_name,
      client_phone_number,
      client_email,
      media_category_1,
      media_category_2,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      service_status,
      funnel,
      staff,
      project_id,
      create_user_id,
      created_at,
      is_register_required,
      order,
    } = action.payload.data;
    // const targetObj
    const resultObj = {
      id,
      title,
      step,
      client_name,
      client_phone_number,
      client_email,
      media_category_1,
      media_category_2,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      service_status,
      funnel,
      staff,
      project_id,
      create_user_id,
      created_at,
      is_register_required,
      order,
    };
    const key = Object.keys(state.testList).length;
    return {
      ...state,
      postSuccess: true,
      test: {
        id,
        title,
        step,
        client_name,
        client_phone_number,
        client_email,
        media_category_1,
        media_category_2,
        service_extra_info,
        service_category,
        service_format,
        service_description,
        service_status,
        funnel,
        staff,
        project_id,
        create_user_id,
        created_at,
        is_register_required,
        order,
      },
      testList: {
        ...testList,
        [key + 1]: resultObj,
      },
    };
  },
  [POST_TEST_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
  [PATCH_TEST_SUCCESS]: (state, action) => {
    const {
      id,
      title,
      step,
      client_name,
      client_phone_number,
      client_email,
      media_category_1,
      media_category_2,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      service_status,
      funnel,
      staff,
      project_id,
      create_user_id,
      created_at,
      is_register_required,
      order,
    } = action.payload.data;

    return {
      ...state,
      test: {
        id,
        title,
        step,
        client_name,
        client_phone_number,
        client_email,
        media_category_1,
        media_category_2,
        service_extra_info,
        service_category,
        service_format,
        service_description,
        service_status,
        funnel,
        staff,
        project_id,
        create_user_id,
        created_at,
        is_register_required,
        order,
      },
    };
  },
  [PATCH_TEST_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
  [GET_TEST_PRICE_SUCCESS]: (state, action) => ({
    ...state,
    testPrice: action.payload.data,
  }),
  [GET_TEST_PRICE_FAILURE]: state => ({
    ...state,
    getFailure: true,
  }),
}, initialState);
