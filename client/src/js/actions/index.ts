import { 
  EditPayload,
  Reminder,
  TogglePayload, 
  UpdatePayload, 
  DeletePayload
} from '../types/index';
import { 
  ADD_REMINDER,
  TOGGLE_REMINDER,
  DELETE_REMINDER,
  UPDATE_REMINDER,
  EDIT_TASK,
} from '../constants/index';
import { Socket } from 'socket.io';

export const addReminder = (payload: Reminder) => {
  return {
      type: ADD_REMINDER,
      payload,
  }
}

export const editTask = (payload: EditPayload) => {
  return {
    type: EDIT_TASK,
    payload
  }
}

export const toggleReminder = (payload: TogglePayload) => {
  return {
    type: TOGGLE_REMINDER,
    payload
  }
}

export const updateReminder = (payload: UpdatePayload) => {
  return {
    type: UPDATE_REMINDER,
    payload
  }
}

export const deleteReminder = (payload: DeletePayload) => {
  return {
    type: DELETE_REMINDER,
    payload
  }
}

export const addReminderSocketAction = (payload: Reminder, socket: Socket) => {
  return (dispatch: any) => {
    socket.emit('addReminder', payload)
  }
}

export const toggleReminderSocketAction = (payload: { id: string }, socket: Socket) => {
  return (dispatch: any) => {
    socket.emit('toggleReminder', payload)
  }
}

export const deleteReminderSocketAction = (payload: DeletePayload, socket: Socket) => {
  return (dispatch: any) => {
    socket.emit('deleteReminder', payload)
  }
}

export const editReminderSocketAction = (payload: EditPayload, socket: Socket) => {
  return (dispatch: any) => {
    socket.emit('editReminder', payload)
  }
}

export const updateReminderSocketAction = (payload: UpdatePayload, socket: Socket) => {
  return (dispatch: any) => {
    socket.emit('updateReminder', payload)
  }
}
