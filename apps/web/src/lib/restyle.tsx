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
		red: {
			"100": "#ff0000",
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
