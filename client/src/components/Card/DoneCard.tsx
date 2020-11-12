import React, {FC} from 'react';
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
	done: boolean
	socket: any,
}

const DoneCard: FC<Props> = ({ id, title, done, socket }) => {
	const dispatch = useDispatch();

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
		<article className="cardDone">
			<section className="cardDone__header">
				<section>
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
			<section className="cardDone__body">

			</section>
		</article>
	)
}

export default DoneCard;