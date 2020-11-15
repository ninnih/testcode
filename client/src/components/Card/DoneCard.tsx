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

interface Props {
	title: string,
	id: string,
	socket: any,
	key: number
}

const DoneCard: FC<Props> = ({ id, title, socket, key }) => {
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
		key={key}>
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
			</section>
		</article>
	)
}

export default DoneCard;