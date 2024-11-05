"use client";

import type { CharacterCountStorage } from "@tiptap/extension-character-count";
import type { ReactNode } from "react";

import CharacterCount from "@tiptap/extension-character-count";
import UnderlineExtension from "@tiptap/extension-underline";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { startTransition } from "react";
import { css } from "restyle";

import { theme } from "../lib/restyle";
import { insideFocusRing, outsideFocusRing, srOnly } from "../lib/styles";
import { Button, Group, Separator, ToggleButton, Toolbar } from "./aria";
import {
	Bold,
	Clear,
	Heading,
	HorizontalLine,
	Italic,
	OrderedList,
	Redo,
	Strike,
	Underline,
	Undo,
	UnorderedList,
} from "./icons";

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
	UnderlineExtension,
	CharacterCount,
];

const CommandButton = ({
	children,
	disabled,
	onPress,
}: Readonly<{ children: ReactNode; disabled?: boolean | undefined; onPress: () => void }>) => {
	return (
		<Button
			css={{
				"&[data-disabled]": {
					background: theme.color.olive[9],
				},
				"&[data-hovered]": {
					background: theme.color.grass[10],
				},
				alignItems: "center",
				aspectRatio: "1/1",
				background: theme.color.grass[9],
				borderRadius: 4,
				color: theme.color.olive[1],
				display: "flex",
				height: 36,
				justifyContent: "center",
				paddingBlock: 4,
				paddingInline: 8,
				...outsideFocusRing,
			}}
			isDisabled={disabled ?? false}
			onPress={onPress}
		>
			{children}
		</Button>
	);
};

const CommandToggleButton = ({
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
				alignItems: "center",
				aspectRatio: "1/1",
				background: theme.color.grass[3],
				borderColor: theme.color.grass[8],
				borderRadius: 4,
				borderStyle: "solid",
				borderWidth: 2,
				display: "flex",
				height: 36,
				justifyContent: "center",
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

const TopBar = () => {
	// eslint-disable-next-line react-compiler/react-compiler --- that seems to be false positive
	"use no memo";

	const { editor } = useCurrentEditor();

	if (!editor) {
		throw new Error("TopBar must be rendered under the editor context");
	}

	return (
		<Toolbar
			css={{
				alignItems: "center",
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
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleBold().run();
					}}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					isSelected={editor.isActive("bold")}
				>
					<span css={srOnly}>Toggle Bold</span>
					<span aria-hidden>
						<Bold />
					</span>
				</CommandToggleButton>
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleItalic().run();
					}}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					isSelected={editor.isActive("italic")}
				>
					<span css={srOnly}>Toggle italic</span>
					<span aria-hidden>
						<Italic />
					</span>
				</CommandToggleButton>
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleStrike().run();
					}}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					isSelected={editor.isActive("strike")}
				>
					<span css={srOnly}>Toggle strike</span>
					<span aria-hidden>
						<Strike />
					</span>
				</CommandToggleButton>
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleUnderline().run();
					}}
					disabled={!editor.can().chain().focus().toggleUnderline().run()}
					isSelected={editor.isActive("underline")}
				>
					<span css={srOnly}>Toggle underline</span>
					<span aria-hidden>
						<Underline />
					</span>
				</CommandToggleButton>
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
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleHeading({ level: 1 }).run();
					}}
					disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
					isSelected={editor.isActive("heading", { level: 1 })}
				>
					<span css={srOnly}>Toggle heading</span>
					<span aria-hidden>
						<Heading />
					</span>
				</CommandToggleButton>
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleOrderedList().run();
					}}
					disabled={!editor.can().chain().focus().toggleOrderedList().run()}
					isSelected={editor.isActive("orderedList")}
				>
					<span css={srOnly}>Toggle unordered list</span>
					<span aria-hidden>
						<UnorderedList />
					</span>
				</CommandToggleButton>
				<CommandToggleButton
					onChange={() => {
						editor.chain().focus().toggleBulletList().run();
					}}
					disabled={!editor.can().chain().focus().toggleBulletList().run()}
					isSelected={editor.isActive("bulletList")}
				>
					<span css={srOnly}>Toggle ordered list</span>
					<span aria-hidden>
						<OrderedList />
					</span>
				</CommandToggleButton>
				<CommandButton
					onPress={() => {
						editor.chain().focus().setHorizontalRule().run();
					}}
					disabled={!editor.can().chain().focus().setHorizontalRule().run()}
				>
					<span css={srOnly}>Add horizontal line</span>
					<span aria-hidden>
						<HorizontalLine />
					</span>
				</CommandButton>
				<CommandButton
					onPress={() => {
						editor.chain().focus().clearNodes().unsetAllMarks().run();
					}}
					disabled={!editor.can().chain().focus().clearNodes().unsetAllMarks().run()}
				>
					<span css={srOnly}>Clear formatting</span>
					<span aria-hidden>
						<Clear />
					</span>
				</CommandButton>
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
				<CommandButton
					onPress={() => {
						editor.chain().focus().undo().run();
					}}
					disabled={!editor.can().chain().focus().undo().run()}
				>
					<span css={srOnly}>Undo edit</span>
					<span aria-hidden>
						<Undo />
					</span>
				</CommandButton>
				<CommandButton
					onPress={() => {
						editor.chain().focus().redo().run();
					}}
					disabled={!editor.can().chain().focus().redo().run()}
				>
					<span css={srOnly}>Redo edit</span>
					<span aria-hidden>
						<Redo />
					</span>
				</CommandButton>
			</Group>
		</Toolbar>
	);
};

const BottomBar = ({ saveChangesAction }: Readonly<{ saveChangesAction: (content: string) => Promise<void> }>) => {
	// eslint-disable-next-line react-compiler/react-compiler --- that seems to be false positive
	"use no memo";

	const { editor } = useCurrentEditor();

	if (!editor) {
		throw new Error("BottomBar must be rendered under the editor context");
	}

	const storage = editor.storage["characterCount"] as CharacterCountStorage;

	const saveChanges = () => {
		const newContent = editor.getHTML();

		startTransition(async () => {
			await saveChangesAction(newContent);
		});
	};

	return (
		<div css={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
			<p
				css={{
					fontSize: 15,
					fontWeight: 300,
				}}
			>
				Characters: <span css={{ color: theme.color.grass[12] }}>{storage.characters()}</span> Words:{" "}
				<span css={{ color: theme.color.grass[12] }}>{storage.words()}</span>
			</p>
			<CommandButton onPress={saveChanges}>Save</CommandButton>
		</div>
	);
};

export const Editor = ({
	content = "",
	saveChangesAction,
}: Readonly<{ content?: string; saveChangesAction: (content: string) => Promise<void> }>) => {
	const [className, Styles] = css({
		"& .tiptap": {
			borderColor: theme.color.olive[8],
			borderRadius: 8,
			borderStyle: "solid",
			borderWidth: 2,
			marginBlock: 12,
			padding: 12,
			...insideFocusRing,
		},
		"& :is(ul,ol,p)": {
			":first-child": {
				marginBlockStart: 0,
			},
			":last-child": {
				marginBlockEnd: 0,
			},
			marginBlock: 8,
		},
		"& h1": {
			":first-child": {
				marginBlockStart: 0,
			},
			":last-child": {
				marginBlockEnd: 0,
			},
			fontSize: 24,
			fontWeight: 500,
			marginBlock: 12,
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
			marginInlineStart: 16,
		},
		"& ol": {
			listStyleType: "decimal",
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
				content={content}
				extensions={extensions}
				immediatelyRender={false}
				slotAfter={<BottomBar saveChangesAction={saveChangesAction} />}
				slotBefore={<TopBar />}
			/>
			<Styles />
		</>
	);
};
