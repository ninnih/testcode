import React, { FC } from 'react';
import './Header.scss';
import AddNew from '../AddNew/AddNew';

interface Props {
	openModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	users: Object
}

const Header: FC<Props> = ({ openModal, users }) => {
	return (
		<header>
			<section className="item item--createnew">
				<button onClick={openModal}>
					<AddNew />
				</button>
			</section>
			<section className="item item--identity">
				<h2>Reminder App</h2>
				<p>By Ninni Hagström</p>
			</section>
			<section className="item item--users">
				<h4>Users online: {Object.values(users).length}</h4>
				<section>
					{Object.values(users).map((user: string, i: number) => (
						<p key={i}>{user},</p>
					))}
				</section>
			</section>
		</header>
	)
}

export default Header
