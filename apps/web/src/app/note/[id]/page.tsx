import { Effect, Option } from "effect";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { Editor } from "../../../components/editor";
import { findNoteById, updateNote } from "../../../lib/database";
import { runtime } from "../../../lib/effect";

const ExistingNotePage = async ({ params }: Readonly<{ params: Promise<{ id: string }> }>) => {
	await connection();

	const noteId = (await params).id;
	const note = await runtime.runPromise(
		findNoteById(Number(noteId)).pipe(
			Effect.map((maybeNote) => {
				return Option.getOrNull(maybeNote);
			}),
		),
	);

	if (!note) {
		return redirect("/");
	}

	return (
		<Editor
			saveChangesAction={async (content) => {
				"use server";

				await runtime.runPromise(updateNote({ content, id: Number(noteId) }));
			}}
			content={note.content}
		/>
	);
};

export default ExistingNotePage;
