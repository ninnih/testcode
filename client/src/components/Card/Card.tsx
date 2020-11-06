import React, { FC } from 'react'
import './Card.scss';

const Card: FC = () => {
	return (
		<article className="card">
			<section className="card__header">
				<section>
					<h3>Title</h3>
				</section>
				<section>
					<input type="checkbox" name="" id=""/>
				</section>
			</section>
			<section className="card__body">

			</section>
			<section className="card__footer">

			</section>
		</article>
	)
}

export default Card;