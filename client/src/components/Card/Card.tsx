import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux'
import { editTask } from '../../js/actions/index'
import './Card.scss';

interface Props {
	title: string,
	tasks: [
		title: any
	],
	id: string
}

const Card: FC<Props> = ({ title, tasks, id }) => {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false)

	const editableTask = (e: any) => {
		!edit ? setEdit(true) : setEdit(false)
		dispatch(editTask(edit))
	}

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
						{tasks.map(task => (
							!task.edit ?
							<li>
								<button 
									onClick={(e) => editableTask(e)}
									id={id}>
										{task.task}
								</button>
							</li>
							: <input type="text" value={task.task}/>
						))}
					</ul>
				</article>
			</section>
			<section className="card__footer">

			</section>
		</article>
	)
}

export default Card;