import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './InputModal.scss';
import { v4 as uuidv4 } from 'uuid';
import { 
	addReminder,
	addReminderSocketAction
 } from '../../js/actions/index'


import Button from '../Button/Button'
import CancelIcon from '@material-ui/icons/Cancel';
import Task from './Task/Task';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

interface Props {
	openModal: (e: any) => void,
	socket: any
}

interface Input { 
	done: boolean,
	title: string,
	owner: string,
	tasks: Array<any>,
	urgent: boolean,
	error: string,
	id: string,
	edit: boolean
}

const InputModal: FC<Props> = ({ openModal, socket }) => {
	const dispatch = useDispatch();

	const [input, setInput] = useState<Input>({
		title: '',
		done: false,
		owner: '',
		tasks: [{}],
		urgent: false,
		error: '',
		id: '',
		edit: false
	})
	
	const [tasks, setTasks] = useState<number>(1)

	const addTaskInputField = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
		setTasks(prevCount => prevCount + 1)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const taskArr: any = [];
		let target = Array.from(document.getElementsByName('task'));

		target.map((task: any) => {
			taskArr.push({
				[task.id]: task.value,
				done: false,
				id: uuidv4(),
				edit: false
			})
		})

		setInput({
			...input,
			tasks: taskArr,
			done: false,
			owner: 'example',
			[e.target.id]: e.target.value,
			urgent: false,
			id: uuidv4(),
			edit: false
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

	// useEffect(() => {
	// 	socket.on('reminderAdded', (reminderDataResponse: any) => {
	// 		dispatch(addReminder(reminderDataResponse))
	// 	})
	// }, [dispatch, socket])


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
				<section>
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
					<article>
						<label htmlFor="tasktitle">Title</label>
						<input 
							type="text"
							id="title"
							value={input.title}
							placeholder="Add a title"
							onChange={handleChange}
							></input>
					</article>
				{[...Array(tasks)].map((e, i) => 
					(<Task 
						type="text" 
						id="task"
						handleChange={handleChange}
						input={input}
						key={i}/>))}
					<article>
						<Tooltip title="Add another task" placement="left">
							<button onClick={addTaskInputField}>
								<AddIcon/>
							</button>
						</Tooltip>
					</article>
					<article>
						<Button type="submit" value="Create reminder"/>
					</article>
				</section>
			</form>
		</section>
	)
}

export default InputModal;
