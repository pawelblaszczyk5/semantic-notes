import Link from "next/link";
import { connection } from "next/server";

import { findAllNotes } from "../lib/database";
import { runtime } from "../lib/effect";
import { getTitle } from "../lib/html";

const HomePage = async () => {
	await connection();

	const notes = await runtime.runPromise(findAllNotes(null));

	const notesWithTitle = notes.map((note) => {
		let title = getTitle(note.content);

		if (title.length > 30) {
			title = `${title.slice(0, 30)}...`;
		}

		return {
			...note,
			title,
		};
	});

	return (
		<div
			css={{
				margin: "0 auto",
				maxWidth: "80ch",
			}}
		>
			{notesWithTitle.map((note) => {
				return (
					<Link href={`/note/${note.id.toString()}`} key={note.id} prefetch>
						{note.title}
					</Link>
				);
			})}
		</div>
	);
};

export default HomePage;
