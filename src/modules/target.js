/* eslint-disable camelcase */
import * as TargetAPI from 'lib/api/target';
import { handleActions } from 'redux-actions';

const SET_INIT = 'target/SET_INIT';
const GET_TARGET_LIST_SUCCESS = 'target/GET_TARGET_LIST_SUCCESS';
const GET_TARGET_LIST_FAILURE = 'target/GET_TARGET_LIST_FAILURE';
const GET_TARGET_SUCCESS = 'target/GET_TARGET_SUCCESS';
const GET_TARGET_FAILURE = 'target/GET_TARGET_FAILURE';
const PATCH_TARGET_SUCCESS = 'target/PATCH_TARGET_SUCCESS';
const PATCH_TARGET_FAILURE = 'target/PATCH_TARGET_FAILURE';

export const setTargetInit = () => ({ type: SET_INIT });

export const getTargetList = tId => (dispatch) => {
  return new Promise((resolve, reject) => {
    TargetAPI.getTargetList(tId).then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_TARGET_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_TARGET_LIST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  });
};

export const getTarget = tgId => dispatch => (
  new Promise((resolve, reject) => {
    TargetAPI.getTarget(tgId).then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_TARGET_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_TARGET_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const patchTarget = (tgId, tId, gender, minAge, maxAge) => (dispatch) => {
  return new Promise((resolve, reject) => {
    TargetAPI.patchTarget(tgId, tId, gender, minAge, maxAge).then(
      (res) => {
        console.log(res);
        dispatch({
          type: PATCH_TARGET_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.message);
      console.log(err.reponse);
      dispatch({
        type: PATCH_TARGET_FAILURE,
        payload: err,
      });
      reject(err);
    });
  });
};

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
    extras: null,
  },
};

export default handleActions({
  [SET_INIT]: state => ({
    ...state,
    target: {},
  }),
  [GET_TARGET_SUCCESS]: (state, action) => {
    console.log(action);
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
    console.log(action);
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
  [PATCH_TARGET_FAILURE]: (state, action) => {
    console.log(action);
    return {
      ...state,
      postFailure: true,
    };
  },
}, initialState);
