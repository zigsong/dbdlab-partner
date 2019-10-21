import { handleActions } from 'redux-actions';

const TOGGLE_POPUP = 'popup/TOGGLE_POPUP';
const TOGGLE_TOAST_POPUP = 'popup/TOGGLE_TOAST_POPUP';

export const togglePopup = isOpen => ({ type: TOGGLE_POPUP, isOpen });
export const toggleToastPopup = isToastOpen => ({ type: TOGGLE_TOAST_POPUP, isToastOpen });

const initialState = {
  isOpen: false,
  isToastOpen: false,
};

export default handleActions({
  [TOGGLE_POPUP]: (state, action) => ({
    ...state,
    isOpen: action.isOpen,
  }),
  [TOGGLE_TOAST_POPUP]: (state, action) => ({
    ...state,
    isToastOpen: action.isToastOpen,
  }),
}, initialState);
