import { handleActions } from 'redux-actions';

const TOGGLE_POPUP = 'popup/TOGGLE_POPUP';

export const togglePopup = isOpen => ({ type: TOGGLE_POPUP, isOpen });

const initialState = {
  isOpen: false,
};

export default handleActions({
  [TOGGLE_POPUP]: (state, action) => ({
    ...state,
    isOpen: action.isOpen,
  }),
}, initialState);
