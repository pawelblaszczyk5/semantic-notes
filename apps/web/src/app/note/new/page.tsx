import { redirect } from "next/navigation";
import { connection } from "next/server";

import { Editor } from "../../../components/editor";
import { createEmbeddings, insertNote, Note } from "../../../lib/database";
import { runtime } from "../../../lib/effect";

const NewNotePage = async () => {
	await connection();

	return (
		<Editor
			saveChangesAction={async (content) => {
				"use server";

				const { id } = await runtime.runPromise(insertNote({ content }));

				await runtime.runPromise(createEmbeddings(Note.make({ content, id })));

				redirect(`/note/${id.toString()}`);
			}}
		/>
	);
};

export default NewNotePage;
