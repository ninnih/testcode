import React, { FC } from 'react'
import { Socket } from 'socket.io';
import Board from '../../components/Board/Board';

interface Props {
	socket: Socket
}

const Home: FC<Props> = ({ socket }) => {

	return (
		<main>
			<Board socket={socket}/>
		</main>
	)
}

export default Home;
