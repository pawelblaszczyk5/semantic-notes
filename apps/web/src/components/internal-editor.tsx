"use client";

import type { ReactNode } from "react";

import Underline from "@tiptap/extension-underline";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { css } from "restyle";

import { theme } from "../lib/restyle";
import { insideFocusRing, outsideFocusRing, srOnly } from "../lib/styles";
import { Button, Group, Separator, ToggleButton, Toolbar } from "./aria";

const extensions = [
	StarterKit.configure({
		blockquote: false,
		code: false,
		codeBlock: false,
		dropcursor: false,
		gapcursor: false,
		hardBreak: false,
		heading: {
			levels: [1],
		},
	}),
	Underline,
];

const MenubarButton = ({
	children,
	disabled,
	onPress,
}: Readonly<{ children: ReactNode; disabled: boolean; onPress: () => void }>) => {
	return (
		<Button
			css={{
				"&[data-disabled]": {
					background: theme.color.olive[9],
				},
				"&[data-hovered]": {
					background: theme.color.grass[10],
				},
				background: theme.color.grass[9],
				borderRadius: 4,
				color: theme.color.olive[1],
				height: 36,
				paddingBlock: 4,
				paddingInline: 8,
				...outsideFocusRing,
			}}
			isDisabled={disabled}
			onPress={onPress}
		>
			{children}
		</Button>
	);
};

const MenubarToggleButton = ({
	children,
	disabled,
	isSelected,
	onChange,
}: Readonly<{
	children: ReactNode;
	disabled: boolean;
	isSelected: boolean;
	onChange: (isSelected: boolean) => void;
}>) => {
	return (
		<ToggleButton
			css={{
				"&[data-disabled]": {
					background: theme.color.olive[3],
					borderColor: theme.color.olive[8],
				},
				"&[data-hovered]": {
					background: theme.color.grass[4],
				},
				"&[data-selected]": {
					background: theme.color.grass[5],
				},
				aspectRatio: "1/1",
				background: theme.color.grass[3],
				borderColor: theme.color.grass[8],
				borderRadius: 4,
				borderStyle: "solid",
				borderWidth: 2,
				height: 36,
				paddingBlock: 4,
				paddingInline: 8,
				...outsideFocusRing,
			}}
			isDisabled={disabled}
			isSelected={isSelected}
			onChange={onChange}
		>
			{children}
		</ToggleButton>
	);
};

const Menubar = () => {
	// eslint-disable-next-line react-compiler/react-compiler --- that seems to be false positive
	"use no memo";

	const { editor } = useCurrentEditor();

	if (!editor) {
		throw new Error("Menubar must be rendered under the editor context");
	}

	return (
		<Toolbar
			css={{
				display: "flex",
				gap: 8,
			}}
		>
			<Group
				css={{
					display: "flex",
					gap: 6,
				}}
				aria-label="Style"
			>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleBold().run();
					}}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					isSelected={editor.isActive("bold")}
				>
					<span css={srOnly}>Toggle Bold</span>
					<span aria-hidden>B</span>
				</MenubarToggleButton>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleItalic().run();
					}}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					isSelected={editor.isActive("italic")}
				>
					<span css={srOnly}>Toggle italic</span>
					<span aria-hidden>I</span>
				</MenubarToggleButton>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleStrike().run();
					}}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					isSelected={editor.isActive("strike")}
				>
					<span css={srOnly}>Toggle strike</span>
					<span aria-hidden>S</span>
				</MenubarToggleButton>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleUnderline().run();
					}}
					disabled={!editor.can().chain().focus().toggleUnderline().run()}
					isSelected={editor.isActive("underline")}
				>
					<span css={srOnly}>Toggle underline</span>
					<span aria-hidden>U</span>
				</MenubarToggleButton>
			</Group>
			<Separator
				css={{
					borderColor: theme.color.olive[6],
					borderStyle: "solid",
					borderWidth: 1,
					height: 26,
				}}
				orientation="vertical"
			/>
			<Group
				css={{
					display: "flex",
					gap: 6,
				}}
				aria-label="Elements"
			>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleHeading({ level: 1 }).run();
					}}
					disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
					isSelected={editor.isActive("heading", { level: 1 })}
				>
					<span css={srOnly}>Toggle heading</span>
					<span aria-hidden>H1</span>
				</MenubarToggleButton>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleOrderedList().run();
					}}
					disabled={!editor.can().chain().focus().toggleOrderedList().run()}
					isSelected={editor.isActive("orderedList")}
				>
					<span css={srOnly}>Toggle unordered list</span>
					<span aria-hidden>UL</span>
				</MenubarToggleButton>
				<MenubarToggleButton
					onChange={() => {
						editor.chain().focus().toggleBulletList().run();
					}}
					disabled={!editor.can().chain().focus().toggleBulletList().run()}
					isSelected={editor.isActive("bulletList")}
				>
					<span css={srOnly}>Toggle ordered list</span>
					<span aria-hidden>OL</span>
				</MenubarToggleButton>
				<MenubarButton
					onPress={() => {
						editor.chain().focus().setHorizontalRule().run();
					}}
					disabled={!editor.can().chain().focus().setHorizontalRule().run()}
				>
					<span css={srOnly}>Add horizontal line</span>
					<span aria-hidden>HR</span>
				</MenubarButton>
				<MenubarButton
					onPress={() => {
						editor.chain().focus().clearNodes().unsetAllMarks().run();
					}}
					disabled={!editor.can().chain().focus().clearNodes().unsetAllMarks().run()}
				>
					<span css={srOnly}>Clear formatting</span>
					<span aria-hidden>CR</span>
				</MenubarButton>
			</Group>
			<Separator
				css={{
					borderColor: theme.color.olive[6],
					borderStyle: "solid",
					borderWidth: 1,
					height: 26,
				}}
				orientation="vertical"
			/>
			<Group
				css={{
					display: "flex",
					gap: 6,
				}}
				aria-label="History"
			>
				<MenubarButton
					onPress={() => {
						editor.chain().focus().undo().run();
					}}
					disabled={!editor.can().chain().focus().undo().run()}
				>
					<span css={srOnly}>Undo edit</span>
					<span aria-hidden>&lt;-</span>
				</MenubarButton>
				<MenubarButton
					onPress={() => {
						editor.chain().focus().redo().run();
					}}
					disabled={!editor.can().chain().focus().redo().run()}
				>
					<span css={srOnly}>Redo edit</span>
					<span aria-hidden>-&gt;</span>
				</MenubarButton>
			</Group>
		</Toolbar>
	);
};

export const InternalEditor = () => {
	const [className, Styles] = css({
		"& .tiptap": {
			borderColor: theme.color.olive[8],
			borderRadius: 4,
			borderStyle: "solid",
			borderWidth: 2,
			marginBlockStart: 12,
			...insideFocusRing,
		},
		"& h1": {
			fontSize: 24,
			fontWeight: 500,
		},
		"& hr": {
			borderColor: theme.color.olive[6],
			borderStyle: "solid",
			borderWidth: 1,
			margin: "0 auto",
			marginBlock: 8,
			width: "95%",
		},
		"& li": {
			marginInlineStart: 26,
		},
		"& li > p": {
			paddingInlineStart: 0,
		},
		"& ol": {
			listStyleType: "decimal",
		},
		"& p, h1": {
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
				slotBefore={<Menubar />}
			/>
			<Styles />
		</>
	);
};
