export const ADD_REMINDER = 'ADD_REMINDER';

export type ReminderActions = AddReminderAction;

export interface AddReminderAction {
	type: typeof ADD_REMINDER
	payload: Object
}