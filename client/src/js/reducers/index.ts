import { combineReducers } from 'redux';
import reminderReducer from './reminderReducer';

export const rootReducer = combineReducers({
  reminders: reminderReducer
});

export type RootState = ReturnType<typeof rootReducer>