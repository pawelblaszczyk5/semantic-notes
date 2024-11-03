import type { CSSProperties } from "react";

import { GlobalStyles } from "restyle";

type GlobalKeywords = "inherit" | "initial" | "revert" | "revert-layer" | "unset";

interface ThemedProperties {
	color?: "currentColor" | GlobalKeywords | undefined;
	fontFamily?: "var(--font-family-mono)" | "var(--font-family-sans)" | undefined;
}

interface CSSPropertiesWithoutThemed extends Omit<CSSProperties, keyof ThemedProperties> {}

interface AllCSSProperties extends ThemedProperties, CSSPropertiesWithoutThemed {}

interface CSSObject extends AllCSSProperties {
	[Key: string]: AllCSSProperties | CSSObject | number | string | undefined;
}

declare module "restyle" {
	interface Register {
		cssObject: CSSObject;
	}
}

/* eslint-disable perfectionist/sort-objects -- Want this to be sorted logically and it's not reused */
export const Reset = () => {
	return (
		<>
			<GlobalStyles>
				{{
					":root": {
						"--font-family-sans": `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
						"--font-family-mono": `var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
					},
				}}
			</GlobalStyles>
			<GlobalStyles>
				{{
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
						fontFamily: "var(--font-family-sans)",
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
						fontFamily: "var(--font-family-mono)",
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
						// @ts-expect-error -- it's global reset, it's fine here
						color: "color-mix(in srgb, currentColor 50%, transparent)",
					},
					"img, svg, video, canvas, audio, iframe, embed, object": {
						display: "block",
						verticalAlign: "middle",
					},
					'[hidden]:not([hidden="until-found"])': {
						display: "none",
					},
				}}
			</GlobalStyles>
		</>
	);
};
/* eslint-enable perfectionist/sort-objects -- reenable */
