import { ReminderActions } from './../constants/index';
import { ReminderState } from './../types/index';
import { 
  ADD_REMINDER
} from '../constants/index';

const initialState: ReminderState = {
	data: null,
	loading: false,
	error: ''
};

const reminderReducer = (state = initialState, action: ReminderActions) => {
const payload = action.payload;

	switch (action.type) {
		case ADD_REMINDER:

			return {
        ...state, 
        all: payload,
        results: payload,
        loading: false
      }
		
    default:
			return state;
  }
}

export default reminderReducer;
