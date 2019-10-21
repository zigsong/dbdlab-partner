import * as NotificationAPI from 'lib/api/notification';
import { handleActions } from 'redux-actions';

const GET_NOTI_SUCCESS = 'noti/GET_NOTI_SUCCESS';
const GET_NOTI_FAILURE = 'noti/GET_NOTI_FAILURE';

export const getNotifications = () => dispatch => (
  NotificationAPI.getNotifications().then((res) => {
    dispatch({
      type: GET_NOTI_SUCCESS,
      payload: res,
    });
  }).catch((err) => {
    console.log(err);
    console.log(err.message);
    console.log(err.response);
    dispatch({
      type: GET_NOTI_FAILURE,
      payload: err,
    });
  })
);

const initialState = {
  getSuccess: false,
  getFailure: false,
  count: 0,
  notiList: [],
  noti: {},
};

export default handleActions({
  [GET_NOTI_SUCCESS]: (state, action) => ({
    ...state,
    getSuccess: true,
    notiList: action.payload.data.results,
  }),
  [GET_NOTI_FAILURE]: state => ({
    ...state,
    getFailure: true,
  }),
}, initialState);
