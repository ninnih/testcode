import React, { FC } from 'react';
import { useDispatch } from 'react-redux'
import { 
	toggleReminderSocketAction,
	deleteReminderSocketAction 
} from '../../js/actions/index'
import './DoneCard.scss';
import { Tooltip } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { Socket } from 'socket.io';

interface Props {
	socket: Socket,
	card: any
}

const DoneCard: FC<Props> = ({ socket, card }) => {
	const dispatch = useDispatch();

	const toggleDone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		const id = {id: e.currentTarget.id}
			dispatch(toggleReminderSocketAction(id, socket))
	}

	const deleteDone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		const id = {id: e.currentTarget.id}
		dispatch(deleteReminderSocketAction(id, socket))
	}

	return (
		<article className="cardDone">
			<section className="cardDone__header">
				<section className="cardDone__header__title">
					<h3>{card.title}</h3>
				</section>
				<section>
					<Tooltip title="Mark as not done">
						<button
							id={card.id}
							onClick={toggleDone}>
							<CheckCircleRoundedIcon/>
						</button>
					</Tooltip>
					<Tooltip title="Delete reminder">
						<button
							id={card.id}
							onClick={deleteDone}>
							<DeleteForeverRoundedIcon/>
						</button>
					</Tooltip>
				</section>
			</section>
			<section className="cardDone__body">
				<article>
					<h5>Created at: {card.time} by <p>{card.owner}</p></h5>
				</article>
				<article>
					<h5>Marked done at: {card.timeDone}</h5>
				</article>
			</section>
		</article>
	)
}

export default DoneCard;