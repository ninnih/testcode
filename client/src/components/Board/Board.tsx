import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../js/reducers/index';

import './Board.scss';
import Card from '../Card/Card';

interface Props {
	socket: any
}

const Board: FC<Props> = ({ socket }) => {
	const cards = useSelector((state: any) => state.reminders.results)
	console.log(cards)
	return (
		<section className="board">
			<section className="board__wrapper">
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
	)
}

export default Board;
