import React, { FC, useState } from 'react'
import './InputModal.scss';

import Button from '../Button/Button'
import CancelIcon from '@material-ui/icons/Cancel';
import Task from './Task/Task';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

interface Props {
	openModal: (e: any) => void;
}

const InputModal: FC<Props> = ({ openModal }) => {
	const [tasks, setTasks] = useState<number>(0)

	console.log(tasks)
	const addTaskInput = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
		setTasks(prevCount => prevCount + 1)
	}

	[...Array(tasks)].map((e, i) => (<span className="busterCards" key={i}>♦</span>))

	return (
		<section className="inputmodal">
			<section 
				className="underlay"
				onClick={(e) => {
					openModal(e)
					}}></section>
			<form action="" className="inputform">
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
				{[...Array(tasks)].map((e, i) => (<Task></Task>))}
					<Task></Task>
					<article>
						<Tooltip title="Add another task" placement="left">
							<button onClick={addTaskInput}>
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
