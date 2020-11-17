import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import './InputModal.scss';
import { v4 as uuidv4 } from 'uuid';
import { 
	addReminderSocketAction
 } from '../../js/actions/index'

import Button from '../Button/Button'
import CancelIcon from '@material-ui/icons/Cancel';
import Task from './Task/Task';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

interface Props {
	openModal: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	socket: any
}

interface Input { 
	done: boolean,
	title: string,
	owner: string,
	tasks: Array<any>,
	error: string,
	id: string,
	edit: boolean,  
	time: string,
	timeDone: string,
  expand: boolean
}

const InputModal: FC<Props> = ({ openModal, socket }) => {
	const dispatch = useDispatch();

	const [input, setInput] = useState<Input>({
		title: '',
		done: false,
		owner: '',
		tasks: [{}],
		error: '',
		id: '',
		edit: false,
		time: '',
		timeDone: '',
		expand: false
	})
	
	const [tasks, setTasks] = useState<number>(1)

	const addTaskInputField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		e.stopPropagation()
		setTasks(prevCount => prevCount + 1)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const taskArr: Array<any> = [];
		const target = Array.from(document.getElementsByName('task'));

		target.map((task: any) => {
			taskArr.push({
				[task.id]: task.value,
				done: false,
				id: uuidv4(),
				edit: false,
				cardid: ''
			})
			return taskArr
		})

		setInput({
			...input,
			tasks: taskArr,
			[e.target.id]: e.target.value,
			id: uuidv4(),
		})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if(input.title === '') {
			setInput({
				...input,
				title: '',
				error: 'Please enter a task!'
			})
		} else {
			dispatch(addReminderSocketAction(input, socket))
			setInput({
				...input,
				title: '',
				error: ''
			})
		}
	}

	return (
		<section className="inputmodal">
			<section 
				className="underlay"
				onClick={(e) => {
					openModal(e)
					}}></section>
			<form 
				action="" 
				className="inputform"
				onSubmit={handleSubmit}>
				<section className="inputform__header">
						<article className="closebutton">
							<button onClick={(e) => {
								openModal(e)
								e.stopPropagation()
								}}>
								<CancelIcon/>
							</button>
						</article>
				</section>
				<section>
					<article className="inputform__input ">
						<label htmlFor="tasktitle">Todo Title</label>
						<input 
							type="text"
							id="title"
							value={input.title}
							placeholder="Add a title"
							onChange={handleChange}
							></input>
					</article>
					<section className="inputform__input inputform__input--tasks">
						{[...Array(tasks)].map((e: any, i: number) => 
						(<Task 
							type="text" 
							id="task"
							handleChange={handleChange}
							input={input}
							/>
						))}
						<article>
							<Tooltip title="Add another task" placement="left">
								<button onClick={addTaskInputField}>
									<AddIcon/>
								</button>
							</Tooltip>
						</article>
					</section>
				</section>
				<section className="inputform__footer">
					<article>
						<Button type="submit" value="Create reminder" />
					</article>
				</section>
			</form>
		</section>
	)
}

export default InputModal;
