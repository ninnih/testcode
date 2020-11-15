import React, { FC } from 'react'
import Board from '../../components/Board/Board';

interface Props {
	socket: any
}

const Home: FC<Props> = ({ socket }) => {

	return (
		<main>
			<Board socket={socket}/>
		</main>
	)
}

export default Home;
