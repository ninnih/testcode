import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
	editTask, 
	toggleReminderSocketAction,
	deleteReminderSocketAction 
} from '../../js/actions/index'
import './Card.scss';
import { RootState } from '../../js/reducers/index';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

interface Props {
	title: string,
	tasks: [
		title: any
	],
	id: string,
	done: boolean
	socket: any
}

interface Tasks {
	edit: boolean,
	id: string
}

const Card: FC<Props> = ({ title, tasks, id, done, socket }) => {
	const dispatch = useDispatch();
	// const tasks = useSelector((state: any) => state.reminders.tasks)


	const [edit, setEdit] = useState<Tasks>({
		edit: false,
		id: '',
	})

	const editableTask = (e: any) => {
			setEdit({
				edit: !edit.edit,
				id: e.target.id,
			})
			submitEdit()
	}

	const submitEdit = () => {
		dispatch(editTask(edit))
	}

	const toggleDone = (e: any) => {
		const id = {id: e.currentTarget.id}
			dispatch(toggleReminderSocketAction(id, socket))
	}
	
	const deleteDone = (e:any) => {
		const id = {id: e.currentTarget.id}
		dispatch(deleteReminderSocketAction(id, socket))
	}
  // useEffect(() => {
	// 	dispatch(editTask(edit))
  // },[edit, dispatch])

	return (
		<article className="card">
			<section className="card__header">
				<section>
					<h3>{title}</h3>
				</section>
				<section>
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
								<>{tasks.map(task => (
									!task.edit ?
									<li>
										<h4 
											onClick={(e) => editableTask(e)}
											id={task.id}>
												{task.task}
										</h4>
									</li>
										: <><input 
											type="text" 
											value={task.task}
											/>
											<h2
											onClick={(e) => editableTask(e)}
											id={task.id}>close</h2>
											</>
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
		</article>
	)
}

export default Card;