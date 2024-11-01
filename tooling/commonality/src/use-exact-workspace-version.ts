import type { Check, PackageJson } from "commonality";

import { json } from "commonality";

export default {
	level: "error",
	message: "Workspace dependencies must use exact version",
	validate: async (ctx) => {
		const currentWorkspace = await json<PackageJson>(ctx.package.path, "package.json").get();

		if (!currentWorkspace) {
			return {
				message: "package.json does not exist",
				path: "package.json",
			};
		}

		const workspaceDependenciesWithoutExactVersion = Object.entries({
			...currentWorkspace.dependencies,
			...currentWorkspace.devDependencies,
		})
			.filter(([name, version]) => {
				if (!name.startsWith("@semantic-notes/")) {
					return false;
				}

				const maybeMajorVersionNumber = Number(version.at("workspace:*".length - 1));

				return Number.isNaN(maybeMajorVersionNumber);
			})
			.map(([name]) => {
				return name;
			});

		if (workspaceDependenciesWithoutExactVersion.length > 0) {
			return {
				message: `These workspace dependencies, should use exact "workspace:" protocol versioning: ${workspaceDependenciesWithoutExactVersion.join(", ")}`,
				path: "package.json",
			};
		}

		return true;
	},
} satisfies Check;
