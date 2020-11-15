import React, { FC } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../js/reducers/index';

import './Board.scss';
import Card from '../Card/Card';
import DoneCard from '../Card/DoneCard';

interface Props {
	socket: any
}

const Board: FC<Props> = ({ socket }) => {
	const cards = useSelector((state: RootState) => state.reminders.results.filter((todo: any) => !todo.done))
	const completed = useSelector((state: RootState) => state.reminders.results.filter((todo: any) => todo.done))

	return (
		<section className="board">
			<section className="board__wrapper board__wrapper--todo">
				<section className="board__header board__header--todo">
					<h2>Todo</h2>
				</section>
				<section className="board__cards">
					{!cards ? null 
									: <>
											{cards.map((card: any, i: number) => (
												<Card
													title={card.title}
													id={card.id}
													editable={card.edit}
													socket={socket}
													key={i}
													owner={card.owner}
												/>
											))}
										</>
					}
				</section>
			</section>
			<section className="board__wrapper board__wrapper--done">
				<section className="board__header board__header--done">
					<h2>Done</h2>
				</section>
				<section className="board__cards">
					{ completed ? completed.map((card: any, i: number) => (
												<DoneCard
													title={card.title}
													id={card.id}
													socket={socket}
													key={i}/>	
												))
											: null }
				</section>
			</section>
		</section>
	)
}

export default Board;
