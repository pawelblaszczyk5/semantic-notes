import type { CSSProperties } from "react";

import { GlobalStyles } from "restyle";

export type CSSObjectPick<T extends keyof CSSProperties> =
	| {
			[Key: string]: CSSObjectPick<T> | undefined;
	  }
	| Pick<CSSProperties, T>;

export type CSSObjectExcept<T extends keyof CSSProperties> =
	| {
			[Key: string]: CSSObjectExcept<T> | undefined;
	  }
	| Omit<CSSProperties, T>;

const camelToDashCase = (text: string) => {
	return text.replaceAll(/[A-Z]/gu, (m) => {
		return `-${m.toLowerCase()}`;
	});
};

interface RecursiveTheme {
	[key: string]: RecursiveTheme | string;
}

type ResolveTheme<T extends RecursiveTheme> = {
	[Key in keyof T]: T[Key] extends RecursiveTheme ? ResolveTheme<T[Key]> : string;
};

const createTheme = <Theme extends RecursiveTheme>(theme: Theme) => {
	const rules: Record<string, string> = {};

	const processThemeLevel = (level: RecursiveTheme, path: Array<string> = []) => {
		const resolvedTheme: RecursiveTheme = {};

		Object.entries(level).forEach(([key, value]) => {
			const newPath = [...path, key];

			if (typeof value === "object") {
				resolvedTheme[key] = processThemeLevel(value, newPath);

				return;
			}

			const cssVariableName = `--${newPath
				.map((value) => {
					return camelToDashCase(value);
				})
				.join("-")}`;

			resolvedTheme[key] = `var(${cssVariableName})`;
			rules[cssVariableName] = value;
		});

		return resolvedTheme;
	};

	const resolvedTheme = processThemeLevel(theme);

	const Theme = () => {
		return (
			<GlobalStyles>
				{{
					"@layer theme": {
						":root": rules,
					},
				}}
			</GlobalStyles>
		);
	};

	return [resolvedTheme as ResolveTheme<Theme>, Theme] as const;
};

/* eslint-disable perfectionist/sort-objects -- Want this to be sorted logically and it's not reused */
// eslint-disable-next-line react-refresh/only-export-components -- I want to colocate this, so it's fine
export const [theme, Theme] = createTheme({
	fontFamily: {
		sans: `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
		mono: `var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
	},
	color: {
		grass: {
			"1": "color(display-p3 0.986 0.996 0.985)",
			"2": "color(display-p3 0.966 0.983 0.964)",
			"3": "color(display-p3 0.923 0.965 0.917)",
			"4": "color(display-p3 0.872 0.94 0.865)",
			"5": "color(display-p3 0.811 0.908 0.802)",
			"6": "color(display-p3 0.733 0.864 0.724)",
			"7": "color(display-p3 0.628 0.803 0.622)",
			"8": "color(display-p3 0.477 0.72 0.482)",
			"9": "color(display-p3 0.38 0.647 0.378)",
			"10": "color(display-p3 0.344 0.598 0.342)",
			"11": "color(display-p3 0.263 0.488 0.261)",
			"12": "color(display-p3 0.151 0.233 0.153)",
		},
		olive: {
			"1": "color(display-p3 0.989 0.992 0.989)",
			"2": "color(display-p3 0.974 0.98 0.973)",
			"3": "color(display-p3 0.939 0.945 0.937)",
			"4": "color(display-p3 0.907 0.914 0.905)",
			"5": "color(display-p3 0.878 0.885 0.875)",
			"6": "color(display-p3 0.846 0.855 0.843)",
			"7": "color(display-p3 0.803 0.812 0.8)",
			"8": "color(display-p3 0.727 0.738 0.723)",
			"9": "color(display-p3 0.541 0.556 0.532)",
			"10": "color(display-p3 0.5 0.515 0.491)",
			"11": "color(display-p3 0.38 0.395 0.374)",
			"12": "color(display-p3 0.117 0.129 0.111)",
		},
	},
});
/* eslint-enable perfectionist/sort-objects -- reenable */

/* eslint-disable perfectionist/sort-objects -- Want this to be sorted logically and it's not reused */
export const Reset = () => {
	return (
		<GlobalStyles>
			{{
				"@layer reset": {
					"*, *::before, *::after": {
						boxSizing: "border-box",
						margin: 0,
						padding: 0,
						border: 0,
					},
					"html, :host": {
						lineHeight: 1.5,
						WebkitTextSizeAdjust: "100%",
						tabSize: 4,
						fontFamily: theme.fontFamily.sans,
						fontFeatureSettings: "normal",
						fontVariationSettings: "normal",
						WebkitTapHighlightColor: "transparent",
					},
					body: {
						lineHeight: "inherit",
					},
					hr: {
						height: "0",
						color: "inherit",
						borderTopWidth: "1px",
					},
					"abbr:where([title])": {
						textDecoration: "underline dotted",
					},
					"h1, h2, h3, h4, h5, h6": {
						fontSize: "inherit",
						fontWeight: "inherit",
					},
					a: {
						color: "inherit",
						textDecoration: "inherit",
					},
					"b, strong": {
						fontWeight: "bolder",
					},
					"code, kbd, samp, pre": {
						fontFamily: theme.fontFamily.mono,
						fontFeatureSettings: "normal",
						fontVariationSettings: "normal",
						fontSize: "1em",
					},
					small: {
						fontSize: "80%",
					},
					"sub, sup": {
						fontSize: "75%",
						lineHeight: 0,
						position: "relative",
						verticalAlign: "baseline",
					},
					sub: {
						bottom: "-0.25em",
					},
					sup: {
						top: "-0.5em",
					},
					table: {
						textIndent: 0,
						borderColor: "inherit",
						borderCollapse: "collapse",
					},
					"button, input, optgroup, select, textarea, ::file-selector-button": {
						font: "inherit",
						fontFeatureSettings: "inherit",
						fontVariationSettings: "inherit",
						letterSpacing: "inherit",
						color: "inherit",
						background: "transparent",
					},
					'input:where(:not([type="button"], [type="reset"], [type="submit"])), select, textarea': {
						border: "1px solid",
					},
					'button, input:where([type="button"]), input:where([type="reset"]), input:where([type="submit"]), ::file-selector-button ':
						{
							appearance: "button",
						},
					":-moz-focusring": {
						outline: "auto",
					},
					":-moz-ui-invalid": {
						boxShadow: "none",
					},
					progress: {
						verticalAlign: "baseline",
					},
					"::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
						height: "auto",
					},
					"::webkit-search-decoration": {
						WebkitAppearance: "none",
					},
					summary: {
						display: "list-item",
					},
					"ol, ul, menu": {
						listStyle: "none",
					},
					textarea: {
						resize: "vertical",
					},
					"::placeholder": {
						opacity: "1",
						color: "color-mix(in srgb, currentColor 50%, transparent)",
					},
					"img, svg, video, canvas, audio, iframe, embed, object": {
						display: "block",
						verticalAlign: "middle",
					},
					'[hidden]:not([hidden="until-found"])': {
						display: "none",
					},
				},
			}}
		</GlobalStyles>
	);
};
/* eslint-enable perfectionist/sort-objects -- reenable */
