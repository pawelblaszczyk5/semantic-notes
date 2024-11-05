import { Layer, Logger, ManagedRuntime } from "effect";

import { DatabaseLive } from "./database";

const AppLayer = Layer.mergeAll(DatabaseLive, Logger.structured);

export const runtime = ManagedRuntime.make(AppLayer);
