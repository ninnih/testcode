import React, { FC } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../js/reducers/index';

import './Board.scss';
import Card from '../Card/Card';
import DoneCard from '../Card/DoneCard';
import { Socket } from 'socket.io';

interface Props {
	socket: Socket
}

interface Todo {
	title: string,
  done: boolean,
  edit: boolean,
  id: string,
  owner: string,
  tasks: string[],
	time: string,
	timeDone: string,
	expand: boolean
}

const Board: FC<Props> = ({ socket }) => {
	const cards = useSelector((state: RootState) => state.reminders.results.filter((todo: Todo) => !todo.done))
	const completed = useSelector((state: RootState) => state.reminders.results.filter((todo: Todo) => todo.done))

	return (
		<section className="board">
			<section className="board__wrapper board__wrapper--todo">
				<section className="board__header board__header--todo">
					<h2>Todo</h2>
				</section>
				<section className="board__cards">
					{!cards ? null 
									: <>
											{cards.map((card: Todo, i: number) => (
												<Card
													socket={socket}
													card={card}
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
				<section className="board__cards board__cards--done">
					{ completed ? completed.map((card: Todo, i: number) => (
												<DoneCard
													socket={socket}
													card={card}
													/>	
												))
											: null }
				</section>
			</section>
		</section>
	)
}

export default Board;
