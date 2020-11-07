import { 
  ADD_REMINDER,
  EDIT_TASK
} from '../constants/index';

export const addReminder = (payload: Object) => {
  return {
      type: ADD_REMINDER,
      payload
  }
}

export const editTask = (payload: Object) => {
  return {
    type: EDIT_TASK,
    payload
  }
}
