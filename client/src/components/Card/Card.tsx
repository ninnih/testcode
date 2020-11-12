import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
	editTask,
	toggleReminderSocketAction,
	deleteReminderSocketAction,
	editReminderSocketAction,
	updateReminderSocketAction,
} from '../../js/actions/index'
import './Card.scss';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';
import Button from '../Button/Button';
import { Tooltip } from '@material-ui/core';


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
	const [edit, setEdit] = useState<Tasks>({
		edit: false,
		id: '',
	})
	const [updateCardData, setUpdateCardData] = useState({
		cardtitle: title,
		cardid: ''
	});

	const editableCard = (e: any) => {
		e.preventDefault()
			setEdit({
				edit: !edit.edit,
				id: e.currentTarget.id,
			})
	}

	const updateCard = (e:any) => {
		setUpdateCardData({
			cardtitle: e.target.value,
			cardid: e.target.id
		})
		// socket.emit('editData', updateCardData.cardtitle)
	}

	// socket.on('editDataReceived', (editDataResponse: any) => {
	// 	// setUpdateCardData(editDataResponse)
	// 	setUpdateCardData({
	// 		...updateCardData,
	// 		cardtitle: editDataResponse
	// 	})
	// })

	const submitUpdatedCard = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(updateReminderSocketAction(updateCardData, socket))
		setUpdateCardData({
			cardtitle: '',
			cardid: ''
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
			<form className="card" onSubmit={submitUpdatedCard}>
				<section className="card__header">
					<section>
						{editable ?
						<input
							type="text"
							onChange={updateCard}
							id={id}
							value={updateCardData.cardtitle}></input>
					: <h3>{title}</h3>

					}
					</section>
					<section className="card__header__icon">
						<Tooltip title="Edit Reminder">
							<button
								id={id}
								onClick={(e) => editableCard(e)}
								>
								<EditIcon/>
							</button>
						</Tooltip>
						<Tooltip title="Mark as done">
							<button
								id={id}
								onClick={toggleDone}>
								<CheckCircleOutlineIcon/>
							</button>
						</Tooltip>
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
					{editable ?
					<button
						id={id}
						onClick={deleteDone}>
						<DeleteForeverRoundedIcon/>
					</button>
					: null}
					{editable ? 
					<Button type="submit" value="Save changes"/>
					: null}
				</section>
			</form>
	)
}

export default Card;