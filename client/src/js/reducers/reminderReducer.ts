import { 
  ReminderState, 
  ReminderActions 
} from './../types/index';

import { 
  ADD_REMINDER,
  EDIT_TASK
} from '../constants/index';


const initialState: ReminderState = {
	data: null,
	loading: false,
  error: '',
  all: [],
  results: [],
};

const reminderReducer = (state = initialState, action: ReminderActions) => {
const payload = action.payload;

	switch (action.type) {
		case ADD_REMINDER:

			return {
        ...state, 
        all: payload,
        results: [...state.results, payload],
        loading: false
      }
    
    case EDIT_TASK:
      let content = Object.assign({}, state);

      content.all.tasks = content.all.tasks.map((task: any) => {
        const newObj = {...task};
        if(newObj.id === payload.id) {
          newObj.edit = payload.edit
        }
        return newObj
      })

      return {
      ...state,
      results: [content.all],
      all: {...state.all}
    }

    default:
			return state;
  }
}

export default reminderReducer;
