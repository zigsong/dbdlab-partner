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
  const { protocol } = window.location;
  const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
  const deleteTokenCookie = () => new Promise(() => {
    if (hasTokenCookie !== undefined) {
      const setTokenCookie = (expireDate) => {
        const date = new Date();
        date.setTime(date.getTime() + expireDate * 24 * 60 * 60 * 1000);
        // document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=realdopt.com`;
        document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=localhost`;
      };
      setTokenCookie(-1);
      // document.cookie = 'token=;expires=Thu, 01 Jan 1999 00:00:10 GMT;';
      alert('로그아웃 되었습니다 :)');
    } else {
      alert('다시 로그인 해주세요 :)');
    }
  });

  deleteTokenCookie().then(
    window.location.assign(`${protocol}//qa.realdopt.com/login`),
    // window.location.assign(`${protocol}//localhost:3000/login`),
  );

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
