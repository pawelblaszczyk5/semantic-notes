"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(
	async () => {
		return import("./internal-editor").then(({ InternalEditor }) => {
			return InternalEditor;
		});
	},
	{
		loading: () => {
			return <>Loading...</>;
		},
		ssr: false,
	},
);
