export interface People {
  [name: string]: string
}

export interface Reminder {
  title: string,
  done: boolean,
  edit: boolean,
  id: string,
  owner: string,
  tasks: string[],
  time: string,
  timeDone: string,
  expand: boolean
}