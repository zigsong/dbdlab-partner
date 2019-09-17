import * as AuthAPI from 'lib/api/auth';
import { handleActions } from 'redux-actions';

const GET_AUTH_SELF_SUCCESS = 'auth/GET_AUTH_SELF_SUCCESS';
const GET_AUTH_SELF_FAILURE = 'auth/GET_AUTH_SELF_FAILURE';
const LOGOUT = 'auth/LOGOUT';

export const getAuthSelf = () => dispatch => AuthAPI.getAuthSelf().then(
  (res) => {
    console.log(res);
    dispatch({
      type: GET_AUTH_SELF_SUCCESS,
      payload: res,
    });
  },
).catch((err) => {
  dispatch({
    type: GET_AUTH_SELF_FAILURE,
    payload: err,
  });
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  dispatch({
    type: LOGOUT,
  });
};

const initialState = {
  error: false,
  success: false,
  users: {
    id: '',
    email: '',
    auth_token: '',
    avatar_url: '',
  },
};

export default handleActions({
  [GET_AUTH_SELF_SUCCESS]: (state, action) => {
    const {
      // eslint-disable-next-line camelcase
      id, email, auth_token, avatar_url,
    } = action.payload.data;
    return {
      ...state,
      success: true,
      users: {
        id, email, auth_token, avatar_url,
      },
    };
  },
  [GET_AUTH_SELF_FAILURE]: state => ({
    ...state,
    error: true,
  }),
  [LOGOUT]: () => ({
    error: false,
    success: false,
    users: {
      id: '',
      email: '',
      auth_token: '',
      avatar_url: '',
    },
  }),
}, initialState);
