/* eslint-disable camelcase */
import * as ProjectAPI from 'lib/api/project';
import { handleActions } from 'redux-actions';

const GET_PROJECT_LIST_SUCCESS = 'project/GET_PROJECT_LIST_SUCCESS';
const GET_PROJECT_LIST_FAILURE = 'project/GET_PROJECT_LIST_FAILURE';
const GET_PROJECT_SUCCESS = 'project/GET_PROJECT_SUCCESS';
const GET_PROJECT_FAILURE = 'project/GET_PROJECT_FAILURE';
const PUT_PROJECT_SUCCESS = 'project/PUT_PROJECT_SUCCESS';
const PUT_PROJECT_FAILURE = 'project/PUT_PROJECT_FAILURE';

export const getProjectList = () => dispatch => (
  new Promise((resolve, reject) => {
    ProjectAPI.getProjectList().then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_PROJECT_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: GET_PROJECT_LIST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const putProject = ({ company, service }) => dispatch => (
  new Promise((resolve, reject) => {
    ProjectAPI.putProject({ company, service }).then(
      (res) => {
        console.log(res);
        dispatch({
          type: PUT_PROJECT_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch({
        type: PUT_PROJECT_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const getProject = id => dispatch => (
  new Promise((resolve, reject) => {
    ProjectAPI.getProject(id).then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_PROJECT_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      dispatch({
        type: GET_PROJECT_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

const initialState = {
  getSuccess: false,
  getFailure: false,
  putSuccess: false,
  putFailure: false,
  count: 0,
  next: '',
  previous: '',
  projectList: {},
  project: {},
};

export default handleActions({
  [GET_PROJECT_LIST_SUCCESS]: (state, action) => {
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
      projectList: {
        ...results,
      },
    };
  },
  [GET_PROJECT_LIST_FAILURE]: state => ({
    ...state,
    getPending: false,
    getFailure: true,
  }),
  [PUT_PROJECT_SUCCESS]: (state, action) => {
    console.log(action);
    const {
      id,
      name,
      code,
      company_name,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      create_user_id,
      created_at,
      is_new,
      member_cnt,
    } = action.payload.data;
    const resultObj = {
      id,
      name,
      code,
      company_name,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      create_user_id,
      created_at,
      is_new,
      member_cnt,
    };
    return {
      ...state,
      putSuccess: true,
      project: resultObj,
    };
  },
  [PUT_PROJECT_FAILURE]: state => ({
    ...state,
    putFailure: true,
  }),
  [GET_PROJECT_SUCCESS]: (state, action) => {
    const { project } = state;
    const {
      id,
      name,
      code,
      company_name,
      service_extra_info,
      service_category,
      service_format,
      service_description,
      create_user_id,
      created_at,
      is_new,
      member_cnt,
    } = action.payload.data;

    return {
      project: {
        ...project,
        id,
        name,
        code,
        company_name,
        service_extra_info,
        service_category,
        service_format,
        service_description,
        create_user_id,
        created_at,
        is_new,
        member_cnt,
      },
    };
  },
  [GET_PROJECT_FAILURE]: state => ({
    ...state,
    getFailure: true,
  }),
}, initialState);
