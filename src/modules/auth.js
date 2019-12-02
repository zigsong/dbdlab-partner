/* eslint-disable camelcase */
import * as AuthAPI from 'lib/api/auth';
import config from 'modules/config';
import { handleActions } from 'redux-actions';

const GET_AUTH_SELF_SUCCESS = 'auth/GET_AUTH_SELF_SUCCESS';
const GET_AUTH_SELF_FAILURE = 'auth/GET_AUTH_SELF_FAILURE';
const GET_ACCOUNT_SUCCESS = 'auth/GET_ACCOUNT_SUCCESS';
const GET_ACCOUNT_FAILURE = 'auth/GET_ACCOUNT_FAILURE';
const POST_AVATAR_UPDATE_SUCCESS = 'auth/POST_AVATAR_UPDATE_SUCCESS';
const POST_AVATAR_UPDATE_FAILURE = 'auth/POST_AVATAR_UPDATE_FAILURE';
const PATCH_ACCOUNT_UPDATE_SUCCESS = 'auth/PATCH_ACCOUNT_UPDATE_SUCCESS';
const PATCH_ACCOUNT_UPDATE_FAILURE = 'auth/PATCH_ACCOUNT_UPDATE_FAILURE';
const PUT_PASSWORD_UPDATE_SUCCESS = 'auth/PUT_PASSWORD_UPDATE_SUCCESS';
const PUT_PASSWORD_UPDATE_FAILURE = 'auth/PUT_PASSWORD_UPDATE_FAILURE';
const LOGOUT = 'auth/LOGOUT';

export const getAuthSelf = () => dispatch => new Promise(
  (resolve, reject) => AuthAPI.getAuthSelf().then(
    (res) => {
      dispatch({
        type: GET_AUTH_SELF_SUCCESS,
        payload: res,
      });
      resolve(res);
    },
  ).catch((err) => {
    dispatch({
      type: GET_AUTH_SELF_FAILURE,
      payload: err,
    });
    reject(err);
  }),
);

export const getAccount = id => dispatch => new Promise(
  (resolve, reject) => AuthAPI.getAccount(id).then(
    (res) => {
      dispatch({
        type: GET_ACCOUNT_SUCCESS,
        payload: res,
      });
      resolve(res);
    },
  ).catch((err) => {
    console.log(err);
    console.log(err.response);
    console.log(err.message);
    dispatch({
      type: GET_ACCOUNT_FAILURE,
      payload: err,
    });
    reject(err);
  }),
);

export const postAvatarUpdate = file => dispatch => new Promise(
  (resolve, reject) => AuthAPI.postAvatarUpdate(file).then(
    (res) => {
      dispatch({
        type: POST_AVATAR_UPDATE_SUCCESS,
        payload: res,
      });
      resolve(res);
    },
  ).catch((err) => {
    console.log(err);
    console.log(err.reponse);
    console.log(err.message);
    dispatch({
      type: POST_AVATAR_UPDATE_FAILURE,
      payload: err,
    });
    reject(err);
  }),
);

export const patchAccountUpdate = (id, email, name, phone) => dispatch => new Promise(
  (resolve, reject) => AuthAPI.patchAccountUpdate(id, email, name, phone).then(
    (res) => {
      dispatch({
        type: PATCH_ACCOUNT_UPDATE_SUCCESS,
        payload: res,
      });
      resolve(res);
    },
  ).catch((err) => {
    console.log(err);
    console.log(err.response);
    console.log(err.message);
    dispatch({
      type: PATCH_ACCOUNT_UPDATE_FAILURE,
      payload: err,
    });
    reject(err);
  }),
);

export const putPasswordUpdate = (email, currentPw, nextPw) => dispatch => new Promise(
  (resolve, reject) => AuthAPI.putPasswordUpdate(email, currentPw, nextPw).then(
    (res) => {
      dispatch({
        type: PUT_PASSWORD_UPDATE_SUCCESS,
        payload: res,
      });
      resolve(res);
    },
  ).catch((err) => {
    console.log(err);
    console.log(err.response);
    console.log(err.message);
    dispatch({
      type: PUT_PASSWORD_UPDATE_FAILURE,
      payload: err,
    });
    reject(err);
  }),
);

export const logout = () => (dispatch) => {
  const { protocol } = window.location;
  const hasTokenCookie = document.cookie.split(';').map(c => c).find(x => x.indexOf('token=') > 0);
  const deleteTokenCookie = () => new Promise(() => {
    if (hasTokenCookie !== undefined) {
      const setTokenCookie = (expireDate) => {
        const date = new Date();
        date.setTime(date.getTime() + expireDate * 24 * 60 * 60 * 1000);
        document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=realdopt.com`;
        // document.cookie = `token=;expires=${date.toUTCString()};path=/;domain=localhost`;
      };
      setTokenCookie(-1);
      alert('로그아웃 되었습니다 :)');
    } else {
      alert('다시 로그인 해주세요 :)');
    }
  });

  deleteTokenCookie().then(
    window.location.assign(`${protocol}//${config.REACT_APP_COMPANY_URL}/login`),
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
    is_staff: false,
    email: '',
    name: '',
    phone_number: '',
    auth_token: '',
    avatar_url: '',
  },
};

export default handleActions({
  [GET_AUTH_SELF_SUCCESS]: (state, action) => {
    const {
      id,
      email,
      auth_token,
      avatar_url,
    } = action.payload.data;
    return {
      ...state,
      success: true,
      users: {
        id,
        email,
        auth_token,
        avatar_url,
      },
    };
  },
  [GET_AUTH_SELF_FAILURE]: state => ({
    ...state,
    error: true,
  }),
  [GET_ACCOUNT_SUCCESS]: (state, action) => {
    const {
      id,
      email,
      name,
      phone_number,
      avatar_url,
    } = action.payload.data;
    return {
      ...state,
      success: true,
      users: {
        id,
        email,
        name,
        phone_number,
        avatar_url,
      },
    };
  },
  [GET_ACCOUNT_FAILURE]: state => ({
    ...state,
    error: true,
  }),
  [POST_AVATAR_UPDATE_SUCCESS]: (state, action) => {
    const {
      id,
      email,
      name,
      phone_number,
      avatar_url,
    } = action.payload.data;
    return {
      ...state,
      success: true,
      users: {
        id,
        email,
        name,
        phone_number,
        avatar_url,
      },
    };
  },
  [POST_AVATAR_UPDATE_FAILURE]: state => ({
    ...state,
    error: true,
  }),
  [PATCH_ACCOUNT_UPDATE_SUCCESS]: (state, action) => {
    const {
      id,
      email,
      name,
      phone_number,
      avatar_url,
    } = action.payload.data;
    return {
      ...state,
      success: true,
      users: {
        id,
        email,
        name,
        phone_number,
        avatar_url,
      },
    };
  },
  [PATCH_ACCOUNT_UPDATE_FAILURE]: state => ({
    ...state,
    error: true,
  }),
  [PUT_PASSWORD_UPDATE_SUCCESS]: (state, action) => {
    const {
      id,
      email,
      name,
      phone_number,
      avatar_url,
    } = action.payload.data;
    return {
      ...state,
      success: true,
      users: {
        id,
        email,
        name,
        phone_number,
        avatar_url,
      },
    };
  },
  [PUT_PASSWORD_UPDATE_FAILURE]: state => ({
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
