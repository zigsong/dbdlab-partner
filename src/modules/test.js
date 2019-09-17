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

export const setTestInit = () => ({ type: SET_INIT });

export const setTestListInit = () => ({ type: SET_INIT_LIST });

export const getTestList = pId => dispatch => (
  new Promise((resolve, reject) => {
    TestAPI.getTestList(pId).then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_TEST_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
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
        console.log(res);
        dispatch({
          type: GET_TEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
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
        console.log(res);
        dispatch({
          type: POST_TEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.message);
      console.log(err.reponse);
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
        console.log(res);
        dispatch({
          type: PATCH_TEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.message);
      console.log(err.reponse);
      dispatch({
        type: PATCH_TEST_FAILURE,
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
    console.log(action);
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
    console.log(action);
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
    };
    const key = Object.keys(state.testList).length;
    console.log(key);
    return {
      ...state,
      postSuccess: true,
      testList: {
        ...testList,
        [key + 1]: resultObj,
      },
    };
  },
  [POST_TEST_FAILURE]: (state, action) => {
    console.log(action);
    return {
      ...state,
      postFailure: true,
    };
  },
  [PATCH_TEST_SUCCESS]: (state, action) => {
    console.log(action);
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
      },
    };
  },
  [PATCH_TEST_FAILURE]: (state, action) => {
    console.log(action);
    return {
      ...state,
      postFailure: true,
    };
  },
}, initialState);
