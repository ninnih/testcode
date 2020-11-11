import { 
  ADD_REMINDER,
  TOGGLE_REMINDER,
  DELETE_REMINDER,
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

export const toggleReminder = (payload: Object) => {
  return {
    type: TOGGLE_REMINDER,
    payload
  }
}

export const deleteReminder = (payload: Object) => {
  return {
    type: DELETE_REMINDER,
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
    socket.emit('addReminder', payload)
  }
}

export const toggleReminderSocketAction = (payload: Object, socket: any) => {
  return (dispatch: any) => {
    socket.emit('toggleReminder', payload)
  }
}


export const deleteReminderSocketAction = (payload: Object, socket: any) => {
  return (dispatch: any) => {
    console.log(payload)
    socket.emit('deleteReminder', payload)
  }
}
