import { connection } from "next/server";

import { findAllNotes } from "../lib/database";
import { runtime } from "../lib/effect";

const HomePage = async () => {
	await connection();

	const notes = await runtime.runPromise(findAllNotes(null));

	return (
		<div
			css={{
				margin: "0 auto",
				maxWidth: "80ch",
			}}
		>
			{notes.map((note) => {
				return (
					<a href={`/note/${note.id.toString()}`} key={note.id}>
						{note.content.slice(0, 10)}
					</a>
				);
			})}
		</div>
	);
};

export default HomePage;
