import React, { FC } from 'react'

interface Props {
	type: string,
	id: string,
	handleChange: (e: any) => void,
	input: any,
	key: number,
}

const Task: FC<Props> = ({ handleChange, input, id, key }) => {
	return (
		<article>
			<label>Task</label>
			<input 
				type="text" 
				value={input.title.value} 
				className={`textfield--${key}`}
				id={id}
				name="task"
				placeholder="Enter task" 
				onChange={handleChange}
				/>
		</article>
	)
}

export default Task
