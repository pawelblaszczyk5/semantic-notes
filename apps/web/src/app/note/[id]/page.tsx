import { Effect, Option } from "effect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { Editor } from "../../../components/editor";
import { createEmbeddings, findNoteById, Note, updateNote } from "../../../lib/database";
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

				revalidatePath(`/note/${noteId}`);
				await runtime.runPromise(updateNote({ content, id: Number(noteId) }));
				await runtime.runPromise(createEmbeddings(Note.make({ content, id: Number(noteId) })));
			}}
			content={note.content}
		/>
	);
};

export default ExistingNotePage;
