import React, { FC } from 'react'

interface Props {
	type: string,
	id: string,
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	input: any,
}

const Task: FC<Props> = ({ handleChange, input, id }) => {
	return (
		<article>
			<label>Task</label>
			<input 
				type="text" 
				value={input.title.value} 
				id={id}
				name="task"
				placeholder="Enter task" 
				onChange={handleChange}
				/>
		</article>
	)
}

export default Task
