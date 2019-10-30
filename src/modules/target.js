/* eslint-disable camelcase */
import * as TargetAPI from 'lib/api/target';
import { handleActions } from 'redux-actions';

const SET_INIT = 'target/SET_INIT';
const POST_TARGET_SUCCESS = 'target/POST_TARGET_SUCCESS';
const POST_TARGET_FAILURE = 'target/POST_TARGET_FAILURE';
const POST_TARGET_EXTRA_SUCCESS = 'target/POST_TARGET_EXTRA_SUCCESS';
const POST_TARGET_EXTRA_FAILURE = 'target/POST_TARGET_EXTRA_FAILURE';
const GET_TARGET_LIST_SUCCESS = 'target/GET_TARGET_LIST_SUCCESS';
const GET_TARGET_LIST_FAILURE = 'target/GET_TARGET_LIST_FAILURE';
const GET_TARGET_SUCCESS = 'target/GET_TARGET_SUCCESS';
const GET_TARGET_FAILURE = 'target/GET_TARGET_FAILURE';
const PATCH_TARGET_SUCCESS = 'target/PATCH_TARGET_SUCCESS';
const PATCH_TARGET_FAILURE = 'target/PATCH_TARGET_FAILURE';
const PATCH_TARGET_EXTRA_SUCCESS = 'target/PATCH_TARGET_EXTRA_SUCCESS';
const PATCH_TARGET_EXTRA_FAILURE = 'target/PATCH_TARGET_EXTRA_FAILURE';
const DELETE_EXTRA_SUCCESS = 'target/DELETE_EXTRA_SUCCESS';
const DELETE_EXTRA_FAILURE = 'target/DELETE_EXTRA_FAILURE';

export const setTargetInit = () => ({ type: SET_INIT });

export const postTarget = (tId, gender, minAge, maxAge) => dispatch => (
  new Promise((resolve, reject) => {
    TargetAPI.postTarget(tId, gender, minAge, maxAge).then(
      (res) => {
        dispatch({
          type: POST_TARGET_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      dispatch({
        type: POST_TARGET_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const postTargetExtra = (
  tgId,
  cId,
  cValue,
) => dispatch => TargetAPI.postTargetExtra(
  tgId,
  cId,
  cValue,
)
  .then((res) => {
    dispatch({
      type: POST_TARGET_EXTRA_SUCCESS,
      payload: res,
    });
  }).catch((err) => {
    console.log(err);
    console.log(err.response);
    console.log(err.message);
    dispatch({
      type: POST_TARGET_EXTRA_FAILURE,
      payload: err,
    });
  });

export const patchTargetExtra = (
  tgEx1Id,
  tgId,
  exCate1Id,
  extraInfoDesc1,
) => dispatch => TargetAPI.patchTargetExtra(
  tgEx1Id,
  tgId,
  exCate1Id,
  extraInfoDesc1,
).then((res) => {
  dispatch({
    type: PATCH_TARGET_EXTRA_SUCCESS,
    payload: res,
  });
}).catch((err) => {
  console.log(err);
  console.log(err.response);
  console.log(err.message);
  dispatch({
    type: PATCH_TARGET_EXTRA_SUCCESS,
    payload: err,
  });
});

export const getTargetList = tId => dispatch => (
  new Promise((resolve, reject) => {
    TargetAPI.getTargetList(tId).then(
      (res) => {
        dispatch({
          type: GET_TARGET_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      dispatch({
        type: GET_TARGET_LIST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const getTarget = tgId => dispatch => (
  new Promise((resolve, reject) => {
    TargetAPI.getTarget(tgId).then(
      (res) => {
        dispatch({
          type: GET_TARGET_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      dispatch({
        type: GET_TARGET_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const patchTarget = (tgId, tId, gender, minAge, maxAge) => dispatch => (
  new Promise((resolve, reject) => {
    TargetAPI.patchTarget(tgId, tId, gender, minAge, maxAge).then(
      (res) => {
        dispatch({
          type: PATCH_TARGET_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.message);
      console.log(err.response);
      dispatch({
        type: PATCH_TARGET_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const deleteTargetExtra = (tgExId, tgId) => dispatch => (
  new Promise((resolve, reject) => {
    TargetAPI.deleteTargetExtra(tgExId, tgId).then((res) => {
      dispatch({
        type: DELETE_EXTRA_SUCCESS,
        payload: res,
      });
      resolve(res);
    }).catch((err) => {
      console.log(err);
      console.log(err.response);
      console.log(err.message);
      dispatch({
        type: DELETE_EXTRA_FAILURE,
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
  target: {
    id: null,
    tester_amount: null,
    age_minimum: null,
    age_maximum: null,
    gender: null,
    test_id: null,
    extras: [],
  },
};

export default handleActions({
  [SET_INIT]: state => ({
    ...state,
    target: {},
  }),
  [POST_TARGET_SUCCESS]: (state, action) => {
    const {
      id,
      tester_amount,
      age_minimum,
      age_maximum,
      gender,
      test_id,
      extras,
    } = action.payload.data;

    return {
      ...state,
      postSuccess: true,
      target: {
        id,
        tester_amount,
        age_minimum,
        age_maximum,
        gender,
        test_id,
        extras,
      },
    };
  },
  [POST_TARGET_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
  [POST_TARGET_EXTRA_SUCCESS]: (state, action) => {
    const {
      id,
      target_id,
      category_item_id,
      value,
      name,
    } = action.payload.data;

    return {
      ...state,
      postSuccess: true,
      target: {
        extras: [
          {
            id,
            target_id,
            category_item_id,
            value,
            name,
          },
        ],
      },
    };
  },
  [POST_TARGET_EXTRA_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
  [GET_TARGET_SUCCESS]: (state, action) => {
    const {
      id,
      tester_amount,
      age_minimum,
      age_maximum,
      gender,
      test_id,
      extras,
    } = action.payload.data;

    return {
      ...state,
      target: {
        id,
        tester_amount,
        age_minimum,
        age_maximum,
        gender,
        test_id,
        extras,
      },
    };
  },
  [GET_TARGET_FAILURE]: state => ({
    ...state,
    getFailure: true,
  }),
  [PATCH_TARGET_SUCCESS]: (state, action) => {
    const {
      id,
      tester_amount,
      age_minimum,
      age_maximum,
      gender,
      test_id,
      extras,
    } = action.payload.data;

    return {
      ...state,
      postSuccess: true,
      target: {
        id,
        tester_amount,
        age_minimum,
        age_maximum,
        gender,
        test_id,
        extras,
      },
    };
  },
  [PATCH_TARGET_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
  [PATCH_TARGET_EXTRA_SUCCESS]: state => ({
    ...state,
    postSuccess: true,
  }),
  [PATCH_TARGET_EXTRA_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
  [DELETE_EXTRA_SUCCESS]: state => ({
    ...state,
  }),
  [DELETE_EXTRA_FAILURE]: state => ({
    ...state,
  }),
}, initialState);
