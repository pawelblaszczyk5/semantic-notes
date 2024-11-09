import type { ResolvedMigration } from "@effect/sql/Migrator";

import { Effect } from "effect";

import { createNotesMigration } from "./0001-create-notes";
import { changeVectorSizeMigration } from "./0002-change-vector-size";
import { changeVectorSizeAgainMigration } from "./0003-change-vector-size-again";

export const allMigrations: Array<ResolvedMigration> = [
	[1, "create-notes", Effect.succeed(createNotesMigration)],
	[2, "change-vector-size", Effect.succeed(changeVectorSizeMigration)],
	[3, "change-vector-size", Effect.succeed(changeVectorSizeAgainMigration)],
];
