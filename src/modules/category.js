/* eslint-disable camelcase */
import * as CategoryAPI from 'lib/api/category';
import { handleActions } from 'redux-actions';

const GET_CATEGORY_LIST_SUCCESS = 'category/GET_CATEGORY_LIST_SUCCESS';
const GET_CATEGORY_LIST_FAILURE = 'category/GET_CATEGORY_LIST_FAILURE';
const GET_CATEGORY_SUCCESS = 'category/GET_CATEGORY_SUCCESS';
const GET_CATEGORY_FAILURE = 'category/GET_CATEGORY_FAILURE';
const GET_ITEM_LIST_SUCCESS = 'category/GET_ITEM_LIST_SUCCESS';
const GET_ITEM_LIST_FAILURE = 'category/GET_ITEM_LIST_FAILURE';
const GET_ITEM_SUCCESS = 'category/GET_ITEM_SUCCESS';
const GET_ITEM_FAILURE = 'category/GET_ITEM_FAILURE';

export const getCategories = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    CategoryAPI.getCategories().then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_CATEGORY_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_CATEGORY_LIST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  });
};

export const getCategiryItem = cId => (dispatch) => {
  console.log(cId);

  return new Promise((resolve, reject) => {
    CategoryAPI.getCategiryItem(cId).then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_CATEGORY_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_CATEGORY_FAILURE,
        payload: err,
      });
      reject(err);
    });
  });
};

export const getItems = () => (dispatch) => {
  console.log('get Items');

  return new Promise((resolve, reject) => {
    CategoryAPI.getItems().then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_ITEM_LIST_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_ITEM_LIST_FAILURE,
        payload: err,
      });
      reject(err);
    });
  });
};

export const getItem = iId => (dispatch) => {
  console.log(iId);

  return new Promise((resolve, reject) => {
    CategoryAPI.getCategiryItem(iId).then(
      (res) => {
        console.log(res);
        dispatch({
          type: GET_ITEM_SUCCESS,
          payload: res,
        });
        resolve(res);
      },
    ).catch((err) => {
      console.log(err);
      console.log(err.reponse);
      console.log(err.message);
      dispatch({
        type: GET_ITEM_FAILURE,
        payload: err,
      });
      reject(err);
    });
  });
};

const initialState = {
  getCategoiesSuccess: false,
  getCategoiesFailure: false,
  getCategoySuccess: false,
  getCategoyFailure: false,
  getItemsSuccess: false,
  getItemsFailure: false,
  getItemSuccess: false,
  getItemFailure: false,
  count: 0,
  next: '',
  previous: '',
  categoryList: {},
  category: {},
  itemList: {},
  item: {},
};

export default handleActions({
  [GET_CATEGORY_LIST_SUCCESS]: (state, action) => {
    const {
      count, next, previous, results,
    } = action.payload.data;
    return {
      ...state,
      getCategoiesSuccess: true,
      count,
      next,
      previous,
      categoryList: {
        ...results,
      },
    };
  },
  [GET_CATEGORY_LIST_FAILURE]: state => ({
    ...state,
    getCategoiesFailure: true,
  }),
  [GET_CATEGORY_SUCCESS]: (state, action) => {
    const {
      id, name, description, category_items,
    } = action.payload.data;
    const key = Object.keys(state.categoryList).length;
    console.log(key);

    return {
      ...state,
      category: {
        id, name, description, category_items,
      },
    };
  },
  [GET_CATEGORY_FAILURE]: state => ({
    ...state,
    getCategoyFailure: true,
  }),
  [GET_ITEM_SUCCESS]: (state, action) => {
    const {
      id, name, description, extra_price, category_id,
    } = action.payload.data;
    const key = Object.keys(state.itemList).length;
    console.log(key);

    return {
      ...state,
      getItemSuccess: true,
      // list: {

      // },
      item: {
        id, name, description, extra_price, category_id,
      },
    };
  },
  [GET_ITEM_FAILURE]: state => ({
    ...state,
    getItemFailure: true,
  }),
  [GET_ITEM_LIST_SUCCESS]: (state, action) => {
    const { results } = action.payload.data;

    return {
      ...state,
      itemList: {
        ...results,
      },
    };
  },
  [GET_ITEM_LIST_FAILURE]: state => ({
    ...state,
    getItemsFailure: true,
  }),
}, initialState);
