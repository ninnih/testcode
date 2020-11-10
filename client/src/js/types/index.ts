import {
	ADD_REMINDER,
	EDIT_TASK,
	INITIAL_TASKS
} from './../constants/index';

export type ReminderActions = AddReminderAction | EditTaskAction | InitialTasksAction;

export interface AddReminderAction {
	type: typeof ADD_REMINDER
	payload: Object
}

export interface EditTaskAction {
	type: typeof EDIT_TASK
	payload: any
}


export interface InitialTasksAction {
	type: typeof INITIAL_TASKS
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
	tasks: Array<TaskData> | null,
	urgent: boolean,
	error: string,
	id: number,
	edit: boolean
}

export interface TaskData {
	edit: boolean,
	done: boolean,
	id: string,
	task: string
}
