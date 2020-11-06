import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import postReducer from './postReducer';

export default combineReducers({
  projectReducer,
  postReducer
});