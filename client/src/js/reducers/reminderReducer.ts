import { 
  ReminderState, 
  ReminderActions
} from './../types/index';

import { 
  ADD_REMINDER,
  EDIT_TASK,
  TOGGLE_REMINDER,
  DELETE_REMINDER
  // INITIAL_TASKS
} from '../constants/index';


const initialState = {
  results: [],
  tasks: []
};

const reminderReducer = (state = initialState, action: ReminderActions) => {
const payload = action.payload;
console.log(action)

	switch (action.type) {
		case ADD_REMINDER:
			return {
        ...state, 
        results: [payload, ...state.results],
        tasks: [payload.tasks, ...state.results],
      }

    case TOGGLE_REMINDER:
      console.log(payload)
      return {
        results: state.results.map((task: any) =>
          task.id === payload.id ? { 
						...task, 
						done: !task.done, 
					} 
						: task
        )
      }

    case DELETE_REMINDER:
      return {
      results: state.results.filter((task: any) => task.id !== payload.id)
    }

    
    case EDIT_TASK:
      // console.log(payload)
      // console.log(state.results.map((item:any)=>item))
      // let content = Object.assign({}, state);
      // console.log(content)
      //   content.results.tasks = content.results.tasks.map((task: any) => {
      //     const newObj = {...task};
      //     if(newObj.id === payload.id) {
      //       newObj.edit = payload.edit
      //       console.log(newObj)
      //     }
      //     return newObj
      //   })
      
      let result = {}
        state.results.map((todo: any) => {
          todo.tasks.filter((task: any) => {
            if(task.id === payload.id) {
              console.log(task.id, payload.id)
              task.done = true
              console.log(task)
              return task
            }
          })
        })
      console.log(result)
      return {
        ...state,
        results: [...state.results]
        
      }
    //   return {
    //   ...state,
    //   results: [content.all],
    //   all: [...state.all]
    // }

    default:
			return state;
  }
}

export default reminderReducer;
