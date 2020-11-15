import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
	toggleReminderSocketAction,
	deleteReminderSocketAction,
	editReminderSocketAction,
	updateReminderSocketAction,
} from '../../js/actions/index'
import './Card.scss';
import Button from '../Button/Button';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import { RootState } from '../../js/reducers';

interface Props {
	title: string,
	id: string,
	socket: any,
	editable: boolean
	key: number,
	owner: string
}

interface Tasks {
	edit: boolean,
	id: string,
}

const Card: FC<Props> = ({ title, id, socket, editable, key, owner }) => {
	const dispatch = useDispatch();
	
	const tasks = useSelector((state: RootState) => state.reminders.tasks)
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

	const updateCard = (e: React.ChangeEvent<HTMLInputElement>) => {
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
	}, [edit, dispatch, socket])

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
			<form 
				className="card" 
				onSubmit={submitUpdatedCard}
				key={key}>
				<section className="card__header">
					<section>
						{ editable ?
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
					<section className="card__info">
						<h5>Card created by:</h5>
						<p>{owner}</p>
					</section>
				<section className="card__body">
					<article>
						<ul>
							{ tasks === undefined ?
																			null
																		:
																		<>{ tasks.map((task: any, i: number) => (
																				task.cardid === id ?
																				<li key={i}>
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
					{ editable ?
											<>
												<button
													id={id}
													onClick={deleteDone}>
													<DeleteForeverRoundedIcon/>
												</button>
												<Button type="submit" value="Save changes"/>
											</>
										: null }
				</section>
			</form>
	)
}

export default Card;