import type { ResolvedMigration } from "@effect/sql/Migrator";

import { Effect } from "effect";

import { createNotesMigration } from "./0001-create-notes";

export const allMigrations: Array<ResolvedMigration> = [[1, "create-notes", Effect.succeed(createNotesMigration)]];
