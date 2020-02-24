import React from 'react';

type HelloProps = {
  name: string;
}

export const Hello = ({ name }: HelloProps): JSX.Element => (
	<h1>{ name }</h1>
);
