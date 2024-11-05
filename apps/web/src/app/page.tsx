import Link from "next/link";
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
					<Link href={`/note/${note.id.toString()}`} key={note.id} prefetch>
						{note.content.slice(0, 10)}
					</Link>
				);
			})}
		</div>
	);
};

export default HomePage;
