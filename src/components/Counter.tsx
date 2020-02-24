import React, { useState } from 'react';
import { Typography, ButtonGroup, IconButton } from '@material-ui/core';
import {
	Add as AddIcon,
	Remove as RemoveIcon,
} from '@material-ui/icons';

type CounterProps = {
	value?: number;
}

export const Counter = ({
	value: defaultValue,
}: CounterProps ): JSX.Element => {
	const [value, setValue] = useState(defaultValue ?? 0);

	return (
		<>
			<Typography>{value}</Typography>
			<ButtonGroup size="small">
				<IconButton onClick={() => setValue(value - 1)}>
					<RemoveIcon />
				</IconButton>
				<IconButton onClick={() => setValue(value + 1)}>
					<AddIcon />
				</IconButton>
			</ButtonGroup>
		</>
	);
};
