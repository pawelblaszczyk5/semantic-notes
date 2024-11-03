import core from "@semantic-notes/eslint-config/core";
import react from "@semantic-notes/eslint-config/react";
import node from "@semantic-notes/eslint-config/node";
import next from "@semantic-notes/eslint-config/next";

export default [
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	...core,
	...react,
	...node,
	...next,
	{
		files: ["next.config.ts"],
		rules: {
			"import-x/no-default-export": "off",
		},
	},
	{
		files: ["src/app/**/{page,layout}.tsx"],
		rules: {
			"import-x/no-default-export": "off",
			"react-refresh/only-export-components": [
				"error",
				{
					allowConstantExport: true,
					allowExportNames: ["metadata"],
				},
			],
		},
	},
];
