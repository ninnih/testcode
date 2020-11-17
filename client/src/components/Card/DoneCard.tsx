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
	title: string,
	id: string,
	socket: Socket,
	timeDone: string
}

const DoneCard: FC<Props> = ({ id, title, socket, timeDone }) => {
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
		<article 
		className="cardDone"
		>
			<section className="cardDone__header">
				<section className="cardDone__header__title">
					<h3>{title}</h3>
				</section>
				<section>
					<Tooltip title="Mark as not done">
						<button
							id={id}
							onClick={toggleDone}>
							<CheckCircleRoundedIcon/>
						</button>
					</Tooltip>
					<Tooltip title="Delete reminder">
						<button
							id={id}
							onClick={deleteDone}>
							<DeleteForeverRoundedIcon/>
						</button>
					</Tooltip>
				</section>
				<section>
					<h5>{timeDone}</h5>
				</section>
			</section>
		</article>
	)
}

export default DoneCard;