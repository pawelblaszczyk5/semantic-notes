import { createCss } from "@tokenami/css";

import { config } from "./config.js";

export const css = createCss(config, { escapeSpecialChars: false });
