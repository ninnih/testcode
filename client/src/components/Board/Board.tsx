import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../js/reducers/index';

import './Board.scss';
import Card from '../Card/Card';
import DoneCard from '../Card/DoneCard';

interface Props {
	socket: any
}

const Board: FC<Props> = ({ socket }) => {
	const cards = useSelector((state: any) => state.reminders.results.filter((todo: any) => !todo.done))
	const completed = useSelector((state: any) => state.reminders.results.filter((todo: any) => todo.done))

	return (
		<section className="board">
			<section className="board__wrapper board__wrapper--todo">
				<section className="board__header board__header--todo">
					<h2>Todo</h2>
				</section>
				<section className="board__cards">
					{cards.length === 0 ? null 
					: <>
					{cards.map((card: any, i: number) => (
							<Card
								title={card.title}
								id={card.id}
								done={card.done}
								editable={card.edit}
								socket={socket}
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
					{completed ? completed.map((card:any) => (
						<DoneCard
							title={card.title}
							id={card.id}
							done={card.done}
							socket={socket}></DoneCard>
					)) : null }
				</section>
			</section>
		</section>
	)
}

export default Board;
