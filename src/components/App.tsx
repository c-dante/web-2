import React from 'react';
import { Counter } from './Counter';
import { Hello } from './Hello';

export const App = (): JSX.Element => (
	<>
		<Hello name={ 'react-webpack-typescript-babel' } />
		<Counter />
	</>
);
