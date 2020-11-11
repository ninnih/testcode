import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
	editTask, 
	toggleReminderSocketAction,
	deleteReminderSocketAction, 
	editReminderSocketAction
} from '../../js/actions/index'
import './Card.scss';
import { RootState } from '../../js/reducers/index';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';
import { Input } from '@material-ui/core';

interface Props {
	title: string,
	id: string,
	done: boolean
	socket: any,
	editable: boolean
}

interface Tasks {
	edit: boolean,
	id: string,
}

const Card: FC<Props> = ({ title, id, done, socket, editable }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state: any) => state.reminders.tasks)
	console.log(tasks)
	const [edit, setEdit] = useState<Tasks>({
		edit: false,
		id: '',
	})

	const editableCard = (e: any) => {
		e.preventDefault()
			setEdit({
				edit: !edit.edit,
				id: e.currentTarget.id,
			})
	}

	useEffect(() => {
		dispatch(editReminderSocketAction(edit, socket))
	}, [edit])

	const toggleDone = (e: any) => {
		e.preventDefault()
		const id = {id: e.currentTarget.id}
			dispatch(toggleReminderSocketAction(id, socket))
	}
	
	const deleteDone = (e:any) => {
		e.preventDefault()
		const id = {id: e.currentTarget.id}
		dispatch(deleteReminderSocketAction(id, socket))
	}

	return (
		<form className="card">
			<section className="card__header">
				<section>
					{editable ? 
					<input type="text"></input>
				: <h3>{title}</h3>

				}
				</section>
				<section>
					<button
						id={id}
						onClick={(e) => editableCard(e)}
						>
						<EditIcon/>
					</button>
					{done ? 
					<button 
						id={id}
						onClick={toggleDone}>
						<CheckCircleRoundedIcon/>
					</button>
					: 
					<button
						id={id}
						onClick={toggleDone}>
						<CheckCircleOutlineIcon />
					</button>
					}
				</section>
			</section>
			<section className="card__body">
				<article>
					<ul>
						{tasks === undefined ? 
							null
								: 
								<>{tasks.map((task: any) => (
									task.cardid === id ?
									<li>
										<h4 
											onClick={(e) => editableCard(e)}
											id={task.id}
											>
												{task.task}
										</h4>
									</li>
									: null
								))}</>
						}
					</ul>
				</article>
			</section>
			<section className="card__footer">
				{done ?
				<button 
					id={id}
					onClick={deleteDone}>
					<DeleteForeverRoundedIcon/>
				</button>
				: null}
			</section>
		</form>
	)
}

export default Card;