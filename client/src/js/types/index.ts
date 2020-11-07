import {
	ADD_REMINDER,
	EDIT_TASK
} from './../constants/index';

export type ReminderActions = AddReminderAction | EditTaskAction;

export interface AddReminderAction {
	type: typeof ADD_REMINDER
	payload: Object
}

export interface EditTaskAction {
	type: typeof EDIT_TASK
	payload: Object
}

export interface ReminderState {
	data: ReminderData | null;
	loading: boolean;
	error: string;
	all: any;
	results: any
}

export interface ReminderData {
	done: boolean,
	title: string,
	owner: string,
	tasks: Array<Object>,
	urgent: boolean,
	error: string,
	id: number
}

