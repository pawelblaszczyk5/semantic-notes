import { createConfig } from "@tokenami/css";

import { config } from "@semantic-notes/css/config";

export default createConfig({
	...config,
	include: ["./src/**/*.{ts,tsx}"],
});
