import { NodeContext } from "@effect/platform-node";
import { Model, SqlSchema } from "@effect/sql";
import { PgClient, PgMigrator } from "@effect/sql-pg";
import { Effect, Layer, Option, Redacted, Schema, String } from "effect";

import { generateEmbeddings } from "./embeddings";
import { splitDocument } from "./html";
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
	execute: (request) => {
		return Effect.gen(function* () {
			const sql = yield* PgClient.PgClient;

			if (request === "") {
				return yield* sql`
					SELECT
						*
					FROM
						${sql("note")}
					ORDER BY
						XMIN::TEXT::BIGINT DESC
				`;
			}

			const embedding = yield* Effect.tryPromise(async () => {
				return generateEmbeddings([request]);
			}).pipe(
				Effect.map((embeddings) => {
					return Option.fromNullable(embeddings[0]);
				}),
				Effect.flatMap((option) => {
					return option;
				}),
				Effect.map((embedding) => {
					return `[${embedding.join(",")}]`;
				}),
			);

			const result = yield* sql`
				WITH
					${sql("closestEmbeddings")} AS (
						SELECT
							${sql("noteId")},
							MIN(
								${sql("embedding")} <-> ${embedding}
							) AS ${sql("minDistance")}
						FROM
							${sql("embedding")}
						GROUP BY
							${sql("noteId")}
					)
				SELECT
					${sql("note")}.${sql("id")},
					${sql("note")}.${sql("content")},
					${sql("closestEmbeddings")}.${sql("minDistance")} AS ${sql("distance")}
				FROM
					${sql("closestEmbeddings")}
					JOIN ${sql("note")} ON ${sql("note")}.${sql("id")} = ${sql("closestEmbeddings")}.${sql("noteId")}
				WHERE
					${sql("closestEmbeddings")}.${sql("minDistance")} < 1
				ORDER BY
					${sql("distance")} ASC;
			`;

			yield* Effect.log(result);

			return result;
		});
	},
	Request: Schema.String,
	Result: Note,
});

export const createEmbeddings = SqlSchema.void({
	execute: (request) => {
		return Effect.gen(function* () {
			const sql = yield* PgClient.PgClient;

			const chunks = yield* Effect.tryPromise(async () => {
				return splitDocument(request.content);
			});

			const embeddings = yield* Effect.tryPromise(async () => {
				return generateEmbeddings(chunks);
			});

			yield* sql`
				DELETE FROM ${sql("embedding")}
				WHERE
					${sql("noteId")} = ${request.id}
			`;

			const dataToInsert = embeddings.map((embedding) => {
				return {
					embedding: `[${embedding.join(",")}]`,
					noteId: request.id,
				};
			});

			return yield* sql`
				INSERT INTO
					${sql("embedding")} ${sql.insert(dataToInsert)}
			`;
		});
	},
	Request: Note,
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
