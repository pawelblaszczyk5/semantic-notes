import { PgClient } from "@effect/sql-pg";
import { Effect } from "effect";

export const changeVectorSizeAgainMigration = Effect.gen(function* () {
	const sql = yield* PgClient.PgClient;

	yield* sql`
		ALTER TABLE ${sql("embedding")}
		DROP COLUMN ${sql("embedding")}
	`;

	yield* sql`
		ALTER TABLE ${sql("embedding")}
		ADD COLUMN ${sql("embedding")} VECTOR (1024)
	`;
});
