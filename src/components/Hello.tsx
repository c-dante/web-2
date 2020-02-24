import React from 'react';
import { Typography } from '@material-ui/core';

type HelloProps = {
  name: string;
}

export const Hello = ({ name }: HelloProps): JSX.Element => (
	<Typography variant="h1">{name}</Typography>
);
