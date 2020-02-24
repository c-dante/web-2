import React, { useState } from 'react';

type CounterProps = {
	value?: number;
}

export const Counter = ({
	value: defaultValue,
}: CounterProps ): JSX.Element => {
	const [value, setValue] = useState(defaultValue ?? 0);

	return (
		<>
			<div>{value}</div>
			<button onClick={() => setValue(value - 1)}>+</button>
			<button onClick={() => setValue(value + 1)}>-</button>
		</>
	);
};
