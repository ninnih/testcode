import { 
	ADD_REMINDER
} from '../constants/index';

export const addReminder = (payload: Object) => {
  return {
      type: ADD_REMINDER,
      payload
  }
}
