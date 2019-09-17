/* eslint-disable camelcase */
import * as PlanAPI from 'lib/api/plan';
import { handleActions } from 'redux-actions';

const GET_PLAN_LIST_SUCCESS = 'plan/GET_PLAN_LIST_SUCCESS';
const GET_PLAN_LIST_FAILURE = 'plan/GET_PLAN_LIST_FAILURE';
const GET_PLAN_SUCCESS = 'plan/GET_PLAN_SUCCESS';
const GET_PLAN_FAILURE = 'plan/GET_PLAN_FAILURE';

export const getPlanList = () => dispatch => PlanAPI.getPlanList().then(
  (res) => {
    console.log(res);
    dispatch({
      type: GET_PLAN_LIST_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  dispatch({
    type: GET_PLAN_LIST_FAILURE,
    payload: err,
  });
});

export const getPlan = planId => dispatch => PlanAPI.getPlan(planId).then(
  (res) => {
    console.log(res);
    dispatch({
      type: GET_PLAN_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  dispatch({
    type: GET_PLAN_FAILURE,
    payload: err,
  });
});

const initialState = {
  getPlanListSuccess: false,
  getPlanListFailure: false,
  getPlanSuccess: false,
  getPlanFailure: false,
  plan: {},
  planList: {},
};

export default handleActions({
  [GET_PLAN_LIST_SUCCESS]: (state, action) => {
    const { results } = action.payload.data;
    return {
      ...state,
      getPlanListSuccess: true,
      planList: results,
    };
  },
  [GET_PLAN_LIST_FAILURE]: state => ({
    ...state,
    getPlanListFailure: true,
  }),
  [GET_PLAN_SUCCESS]: (state, action) => {
    const {
      id, name, description, price_amount,
    } = action.payload.data;
    return {
      ...state,
      getPlanSuccess: true,
      plan: {
        id, name, description, price_amount,
      },
    };
  },
  [GET_PLAN_FAILURE]: state => ({
    ...state,
    getPlanFailure: true,
  }),
}, initialState);
