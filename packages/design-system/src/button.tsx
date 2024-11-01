"use client";

import { useState } from "react";

import { css } from "@semantic-notes/css";

export const Button = () => {
	const [count, setCount] = useState(0);

	return (
		<button
			onClick={() => {
				setCount((count) => {
					return count + 1;
				});
			}}
			style={css({ "--background": "var(--color_amber8)" })}
			type="button"
		>
			Increase test: {count}
		</button>
	);
};
