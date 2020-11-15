import { 
  ADD_REMINDER,
  TOGGLE_REMINDER,
  DELETE_REMINDER,
  UPDATE_REMINDER,
  EDIT_TASK,
} from '../constants/index';

export const addReminder = (payload: Object) => {
  return {
      type: ADD_REMINDER,
      payload,
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

export const updateReminder = (payload: Object) => {
  return {
    type: UPDATE_REMINDER,
    payload
  }
}

export const deleteReminder = (payload: Object) => {
  return {
    type: DELETE_REMINDER,
    payload
  }
}

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
    socket.emit('deleteReminder', payload)
  }
}

export const editReminderSocketAction = (payload: Object, socket: any) => {
  return (dispatch: any) => {
    socket.emit('editReminder', payload)
  }
}

export const updateReminderSocketAction = (payload: Object, socket: any) => {
  return (dispatch: any) => {
    socket.emit('updateReminder', payload)
  }
}
