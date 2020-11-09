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
	payload: any
}

export interface ReminderState {
	data: ReminderData | null;
	loading: boolean;
	error: string;
	all: any;
	results: any;
}

export interface ReminderData {
	done: boolean,
	title: string,
	owner: string,
	tasks: TaskData | null,
	urgent: boolean,
	error: string,
	id: number
}

export interface TaskData {
	edit: boolean,
	done: boolean,
	id: string,
	task: string
}
