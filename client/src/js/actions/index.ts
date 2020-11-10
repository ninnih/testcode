import { 
  ADD_REMINDER,
  EDIT_TASK,
  // INITIAL_TASKS,
} from '../constants/index';

export const addReminder = (payload: Object) => {
  console.log(payload)
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

// export const initialTasks = (payload: any) => {
//   return {
//     type: INITIAL_TASKS,
//     payload
//   }
// } 

// export const initialRemindersAction = (socket: any) => {
//   return (dispatch: any) => {
//     socket.on('initialReminder', (reminderList: Array<Object>) => {
//       console.log(reminderList)
//       dispatch(initialTasks(reminderList))
//     })
//   }
// }

export const addReminderSocketAction = (payload: Object, socket: any) => {
  return (dispatch: any) => {
    console.log(payload)
    socket.emit('addReminder', payload)
  }
}
