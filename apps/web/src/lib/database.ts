import { NodeContext } from "@effect/platform-node";
import { Model, SqlSchema } from "@effect/sql";
import { PgClient, PgMigrator } from "@effect/sql-pg";
import { Effect, Layer, Redacted, Schema, String } from "effect";

import { allMigrations } from "./migrations/entry";

export class Note extends Model.Class<Note>("Note")({
	content: Schema.String,
	id: Model.Generated(Schema.Int),
}) {}

export class Embedding extends Model.Class<Embedding>("Embedding")({
	embedding: Schema.String,
	noteId: Schema.Int,
}) {}

export const insertNote = SqlSchema.single({
	execute: (request) => {
		return Effect.gen(function* () {
			const sql = yield* PgClient.PgClient;

			return yield* sql`
				INSERT INTO
					${sql("note")} ${sql.insert(request)}
				RETURNING
					${sql("id")}
			`;
		});
	},
	Request: Note.insert,
	Result: Schema.Struct(Note.fields).pick("id"),
});

export const updateNote = SqlSchema.void({
	execute: (request) => {
		return Effect.gen(function* () {
			const sql = yield* PgClient.PgClient;

			return yield* sql`
				UPDATE ${sql("note")}
				SET
					${sql.update(request, ["id"])}
				WHERE
					${sql("id")} = ${request.id}
			`;
		});
	},
	Request: Note.update,
});

export const findNoteById = SqlSchema.findOne({
	execute: (request) => {
		return Effect.gen(function* () {
			const sql = yield* PgClient.PgClient;

			return yield* sql`
				SELECT
					*
				FROM
					${sql("note")}
				WHERE
					${sql("id")} = ${request};
			`;
		});
	},
	Request: Note.fields.id,
	Result: Note,
});

export const findAllNotes = SqlSchema.findAll({
	execute: () => {
		return Effect.gen(function* () {
			const sql = yield* PgClient.PgClient;

			return yield* sql`
				SELECT
					*
				FROM
					${sql("note")}
				ORDER BY
					XMIN::TEXT::BIGINT DESC
			`;
		});
	},
	Request: Schema.Null,
	Result: Note,
});

const PgLive = PgClient.layer({
	transformQueryNames: String.camelToSnake,
	transformResultNames: String.snakeToCamel,
	url: Redacted.make("postgres://postgres:postgres@localhost:5432/semantic-notes"),
});

const MigratorLive = PgMigrator.layer({
	loader: Effect.gen(function* () {
		return allMigrations;
	}),
}).pipe(Layer.provide(NodeContext.layer), Layer.provide(PgLive));

export const DatabaseLive = Layer.mergeAll(PgLive, MigratorLive);
