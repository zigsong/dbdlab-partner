/* eslint-disable camelcase */
import * as QuestAPI from 'lib/api/quest';
import { handleActions } from 'redux-actions';

const SET_INIT = 'quest/SET_INIT';
const GET_QUEST_LIST_SUCCESS = 'quest/GET_QUEST_LIST_SUCCESS';
const GET_QUEST_LIST_FAILURE = 'quest/GET_QUEST_LIST_FAILURE';
const GET_QUEST_SUCCESS = 'quest/GET_QUEST_SUCCESS';
const GET_QUEST_FAILURE = 'quest/GET_QUEST_FAILURE';
const PATCH_QUEST_SUCCESS = 'quest/PATCH_QUEST_SUCCESS';
const PATCH_QUEST_FAILURE = 'quest/PATCH_QUEST_FAILURE';

export const setQuestInit = () => ({ type: SET_INIT });

export const getQuestList = tId => dispatch => new Promise((resolve, reject) => {
  QuestAPI.getQuestList(tId).then(
    (res) => {
      dispatch({
        type: GET_QUEST_LIST_SUCCESS,
        payload: res,
      });
      resolve(res);
    },
  ).catch((err) => {
    console.log(err);
    console.log(err.reponse);
    console.log(err.message);
    dispatch({
      type: GET_QUEST_LIST_FAILURE,
      payload: err,
    });
    reject(err);
  });
});

export const getQuest = qId => dispatch => (
  new Promise((resolve, reject) => {
    QuestAPI.getQuest(qId).then(
      (res) => {
        dispatch({
          type: GET_QUEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_QUEST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  })
);

export const patchQuest = (qId, tId, issue, issueDetail, issuePurpose) => dispatch => (
  new Promise((resolve, reject) => {
    QuestAPI.patchQuest(qId, tId, issue, issueDetail, issuePurpose).then(
      (res) => {
        dispatch({
          type: PATCH_QUEST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: PATCH_QUEST_FAILURE,
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
  questList: [],
  quest: {
    id: null,
    issue: null,
    issue_detail: null,
    issue_purpose: null,
  },
};

export default handleActions({
  [SET_INIT]: state => ({
    ...state,
    questList: [],
    quest: {
      id: null,
      issue: null,
      issue_detail: null,
      issue_purpose: null,
    },
  }),
  [GET_QUEST_LIST_SUCCESS]: (state, action) => {
    const {
      count,
      next,
      previous,
      result,
    } = action.payload.data;

    return {
      ...state,
      getSuccess: true,
      count,
      next,
      previous,
      questList: result,
    };
  },
  [GET_QUEST_LIST_FAILURE]: state => ({
    ...state,
    getFailure: true,
  }),
  [PATCH_QUEST_SUCCESS]: (state, action) => {
    const {
      id,
      issue,
      issue_detail,
      issue_purpose,
      test_id,
    } = action.payload.data;

    return {
      ...state,
      quest: {
        id,
        issue,
        issue_detail,
        issue_purpose,
        test_id,
      },
    };
  },
  [PATCH_QUEST_FAILURE]: state => ({
    ...state,
    postFailure: true,
  }),
}, initialState);
