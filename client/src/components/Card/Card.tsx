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
import { Socket } from 'socket.io';

interface Props {
	card: any
	socket: Socket,
}

interface Tasks {
	edit: boolean,
	id: string,
}

interface UpdateCard {
	cardtitle: string,
	cardid: string
}

const Card: FC<Props> = ({ socket, card }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state: RootState) => state.reminders.tasks)
	const [edit, setEdit] = useState<Tasks>({
		edit: false,
		id: '',
	})
	const [updateCardData, setUpdateCardData] = useState<UpdateCard>({
		cardtitle: card.title,
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
	}

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

	const toggleDone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		const id = { id: e.currentTarget.id }
		dispatch(toggleReminderSocketAction(id, socket))
	}

	const deleteDone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		const id = {id: e.currentTarget.id}
		dispatch(deleteReminderSocketAction(id, socket))
	}

	return (
			<form 
				className="card" 
				onSubmit={submitUpdatedCard}
				>
				<section className="card__header">
					<section className="card__header__title">
						{ card.edit ?
												<input
													type="text"
													onChange={updateCard}
													id={card.id}
													value={updateCardData.cardtitle}
													placeholder={card.title}></input>
											: <Tooltip title={card.title} placement="top"><h3>{card.title}</h3></Tooltip>
						}
					</section>
					<section className="card__header__icon">
						<Tooltip title="Mark as done">
							<button
								id={card.id}
								onClick={toggleDone}>
								<CheckCircleOutlineIcon/>
							</button>
						</Tooltip>
					</section>
				</section>
					<section className="card__info">
						<article>
							<Tooltip title="Edit Reminder">
								<button
									id={card.id}
									onClick={(e) => editableCard(e)}
									>
									<EditIcon/>
								</button>
							</Tooltip>
						</article>
						<article>
							<h5>Card created at {card.time} by</h5>
							<p>{card.owner}</p>
						</article>
					</section>
				<section className="card__body">
					<article>
						<ul>
							{ tasks === undefined ?
																			null
																		:
																		<>{ tasks.map((task: any, i: number) => (
																				task.cardid === card.id ?
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
					{ card.edit ?
											<>
												<button
													id={card.id}
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