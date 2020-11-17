import { 
  ReminderActions,
  ReminderState
} from './../types/index';

import { 
  ADD_REMINDER,
  EDIT_TASK,
  TOGGLE_REMINDER,
  DELETE_REMINDER,
  UPDATE_REMINDER
} from '../constants/index';


const initialState: ReminderState = {
  results: [],
  tasks: []
};

const reminderReducer = (state = initialState, action: ReminderActions) => {
const payload = action.payload;

	switch (action.type) {
		case ADD_REMINDER:
      const newArr = payload.tasks.map((task: any) => {
				let item = Object.assign({}, task);
				item.cardid = payload.id
				return item
      })

      return {
        ...state, 
        results: [payload, ...state.results],
        tasks: state.tasks.concat(newArr)
      }

    case TOGGLE_REMINDER:
      return {
        ...state,
        results: state.results.map((task: any) =>
          task.id === payload.id ? { 
						...task, 
            done: !task.done,
            timeDone: payload.timeDone 
					} 
						: task
        )
      }

    case UPDATE_REMINDER:
    return {
      ...state,
      results: state.results.map((task: any) =>
      task.id === payload.cardid ? { 
        ...task, 
        title: payload.cardtitle,
        edit: !task.edit
      } 
        : task
    )
    }

    case DELETE_REMINDER:
      return {
        ...state,
      results: state.results.filter((task: any) => task.id !== payload.id)
    }

    case EDIT_TASK:
      return {
        ...state,
        results: state.results.map((task: any) => 
        task.id === payload.id ? {
          ...task,
          edit: !task.edit
        } 
          : task
      )     
      }


    default:
			return state;
  }
}

export default reminderReducer;
