import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import popup from './popup';
import auth from './auth';
import project from './project';
import test from './test';
import target from './target';
import quest from './quest';
import category from './category';
import plan from './plan';

const rootReducer = combineReducers({
  popup,
  auth,
  project,
  test,
  target,
  quest,
  category,
  plan,
  form: formReducer,
});

export default rootReducer;
