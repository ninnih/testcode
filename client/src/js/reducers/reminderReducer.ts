import { 
  ReminderState, 
  ReminderActions
} from './../types/index';

import { 
  ADD_REMINDER,
  EDIT_TASK,
  // INITIAL_TASKS
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
console.log(action)

	switch (action.type) {
		case ADD_REMINDER:
			return {
        ...state, 
        all: [payload, ...state.all],
        results: [payload, ...state.results],
      }
    
    case EDIT_TASK:
      // let content = Object.assign({}, state);
      // console.log(content)
      // if(content.all.tasks !== undefined) {
      //   content.all.tasks = content.all.tasks.map((task: any) => {
      //     const newObj = {...task};
      //     if(newObj.id === payload.id) {
      //       newObj.edit = payload.edit
      //       console.log(newObj)
      //     }
      //     return newObj
      //   })
      // }

      return {
        ...state,
        
      }
    //   return {
    //   ...state,
    //   results: [content.all],
    //   all: [...state.all]
    // }

    // case INITIAL_TASKS:
    //   console.log(payload)

    //   return {
    //     ...state, 
    //     all: payload,
    //     results: payload,
    //     loading: false
    //   }

    default:
			return state;
  }
}

export default reminderReducer;
