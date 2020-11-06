import React, { FC } from 'react'
import './Board.scss';
import Card from '../Card/Card';

const Board: FC = () => {
	return (
		<section className="board">
			<section className="board__wrapper">
				<Card />
			</section>
		</section>
	)
}

export default Board;
