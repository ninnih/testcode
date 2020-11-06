import React from 'react'
import './AddNew.scss';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from '@material-ui/core';

// type AddNewProps = {
// 	type: string,
// 	value: string
// }

const AddNew = () => {
	return (
			<Tooltip title="Create new reminder" placement="bottom">
				<AddBoxIcon />
			</Tooltip>
	)
}

export default AddNew;
