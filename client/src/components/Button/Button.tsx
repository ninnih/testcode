import React from 'react'
import './Button.scss';

type ButtonProps = {
	type: string,
	value: string
}

const Button = ({ type, value }: ButtonProps ) => {
	return (
		<button className={`button button--${type}`}>
			<h4>{value}</h4>
		</button>
	)
}

export default Button;
