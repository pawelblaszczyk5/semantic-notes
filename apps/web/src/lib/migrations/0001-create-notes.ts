import { PgClient } from "@effect/sql-pg";
import { Effect } from "effect";

export const createNotesMigration = Effect.gen(function* () {
	const sql = yield* PgClient.PgClient;

	yield* sql`
		CREATE TABLE ${sql("note")} (
			${sql("id")} SERIAL PRIMARY KEY,
			${sql("content")} TEXT NOT NULL
		);
	`;

	yield* sql`
		CREATE TABLE ${sql("embedding")} (
			${sql("noteId")} INT NOT NULL,
			${sql("embedding")} VECTOR (1024),
			FOREIGN KEY (${sql("noteId")}) REFERENCES ${sql("note")} (${sql("id")})
		)
	`;
});
