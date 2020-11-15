import React, { FC } from 'react'
import './AddNew.scss';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from '@material-ui/core';

const AddNew: FC = () => {
	return (
			<Tooltip title="Create new reminder" placement="bottom">
				<AddBoxIcon />
			</Tooltip>
	)
}

export default AddNew;
