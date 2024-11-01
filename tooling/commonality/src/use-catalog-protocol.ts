import type { Check, PackageJson } from "commonality";

import { json } from "commonality";

export default {
	level: "error",
	message: 'Dependencies shared across workspaces must use "catalog:" protocol',
	validate: async (ctx) => {
		const currentWorkspace = await json<PackageJson>(ctx.package.path, "package.json").get();

		if (!currentWorkspace) {
			return {
				message: "package.json does not exist",
				path: "package.json",
			};
		}

		const currentWorkspaceDependencies = Object.entries({
			...currentWorkspace.dependencies,
			...currentWorkspace.devDependencies,
		})
			.filter(([name, version]) => {
				return !version.startsWith("catalog:") && !name.startsWith("@semantic-notes/");
			})
			.map(([name]) => {
				return name;
			});

		const otherWorkspaces = await Promise.all(
			ctx.allPackages
				.filter((workspace) => {
					return workspace.path !== ctx.package.path;
				})
				.map(async (workspace) => {
					return json<PackageJson>(workspace.path, "package.json").get();
				}),
		);

		const otherWorkspacesDependencies = new Set(
			otherWorkspaces
				.filter((workspace) => {
					return workspace !== undefined;
				})
				.flatMap((workspace) => {
					return Object.keys({ ...workspace.dependencies, ...workspace.devDependencies });
				}),
		);

		const reusedDependenciesAcrossWorkspaces = currentWorkspaceDependencies.filter((dependency) => {
			return otherWorkspacesDependencies.has(dependency);
		});

		if (reusedDependenciesAcrossWorkspaces.length > 0) {
			return {
				message: `These dependencies are reused across workspaces, they should use "catalog:" protocol: ${reusedDependenciesAcrossWorkspaces.join(", ")}`,
				path: "package.json",
			};
		}

		return true;
	},
} satisfies Check;
