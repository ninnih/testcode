import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editTask } from '../../js/actions/index'
import './Card.scss';
import { RootState } from '../../js/reducers/index';

interface Props {
	title: string,
	tasks: [
		title: any
	],
	id: string
}

interface Tasks {
	edit: boolean,
	id: string
}

const Card: FC<Props> = ({ title, tasks, id }) => {
	const dispatch = useDispatch();

	const [edit, setEdit] = useState<Tasks>({
		edit: false,
		id: '',
	})

	const editableTask = (e: any) => {
			setEdit({
				edit: !edit.edit,
				id: e.target.id,
			})
	}
	
  useEffect(() => {
		dispatch(editTask(edit))
  },[edit, dispatch])

	return (
		<article className="card">
			<section className="card__header">
				<section>
					<h3>{title}</h3>
				</section>
				<section>
					<input type="checkbox" name="" id=""/>
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

			</section>
		</article>
	)
}

export default Card;