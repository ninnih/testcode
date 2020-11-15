import {
	ADD_REMINDER,
	EDIT_TASK,
	TOGGLE_REMINDER,
	UPDATE_REMINDER,
	DELETE_REMINDER
} from './../constants/index';

export type ReminderActions = 
AddReminderAction | 
EditTaskAction | 
ToggleReminderAction |
UpdateReminderAction |
DeleteReminderAction;

export interface AddReminderAction {
	type: typeof ADD_REMINDER
	payload: Object,
}

export interface EditTaskAction {
	type: typeof EDIT_TASK
	payload: any
}

export interface ToggleReminderAction {
	type: typeof TOGGLE_REMINDER
	payload: any
}

export interface UpdateReminderAction {
	type: typeof UPDATE_REMINDER
	payload: any
}

export interface DeleteReminderAction {
	type: typeof DELETE_REMINDER
	payload: any
}


export interface ReminderState {
	results: Array<Object>;
	tasks: Array<Object>
}
