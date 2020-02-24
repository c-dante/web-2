import React from 'react';
import { Card, CardContent, Container } from '@material-ui/core';
import { Counter } from './Counter';
import { Hello } from './Hello';

export const App = (): JSX.Element => (
	<Container>
		<Card>
			<CardContent>
				<Hello name={ 'web-2 / @material-ui' } />
				<Counter />
			</CardContent>
		</Card>
	</Container>
);
