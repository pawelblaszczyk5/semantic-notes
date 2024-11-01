import tseslint from "typescript-eslint";
import markdown from "@eslint/markdown";

// cspell:ignore commonmark

export default tseslint.config({
	files: ["**/*.md"],
	plugins: {
		markdown,
	},
	language: "markdown/commonmark",
	rules: {
		"markdown/fenced-code-language": "error",
		"markdown/heading-increment": "error",
		"markdown/no-empty-links": "error",
		"markdown/no-html": "error",
		"markdown/no-invalid-label-refs": "error",
		"markdown/no-missing-label-refs": "error",
	},
});
