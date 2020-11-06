import React, { FC } from 'react';

import './Header.scss';

import AddBoxIcon from '@material-ui/icons/AddBox';
import MenuIcon from '@material-ui/icons/Menu';
import { Tooltip } from '@material-ui/core';
import AddNew from '../AddNew/AddNew';

interface Props {
	openModal: (e: any) => void;
}

const Header: FC<Props> = ({ openModal }) => {
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
			<section className="item item--menu">
				<MenuIcon />
			</section>
		</header>
	)
}

export default Header