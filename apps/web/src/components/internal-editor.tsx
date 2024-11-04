"use client";

import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { css } from "restyle";

const extensions = [
	StarterKit.configure({
		heading: {
			levels: [1],
		},
	}),
];

export const InternalEditor = () => {
	const [className, Styles] = css({
		"& li": {
			marginInlineStart: 26,
		},
		"& li > p": {
			paddingInlineStart: 0,
		},
		"& ol": {
			listStyleType: "decimal",
		},
		"& p": {
			padding: 8,
		},
		"& ul": {
			listStyleType: "disc",
		},
	});

	return (
		<>
			<EditorProvider
				editorContainerProps={{
					className,
				}}
				extensions={extensions}
				immediatelyRender={false}
			/>
			<Styles />
		</>
	);
};
