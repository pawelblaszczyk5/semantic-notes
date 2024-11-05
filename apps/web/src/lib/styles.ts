import type { CSSObject } from "restyle";

import { theme } from "./restyle";

export const outsideFocusRing = {
	outlineColor: theme.color.violet[8],
	outlineOffset: 4,
	outlineWidth: 3,
} satisfies CSSObject;

export const insideFocusRing = {
	outlineColor: theme.color.violet[8],
	outlineWidth: 3,
} satisfies CSSObject;

export const srOnly = {
	borderWidth: 0,
	clip: "rect(0,0,0,0)",
	height: 1,
	margin: -1,
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	whiteSpace: "nowrap",
	width: 1,
} satisfies CSSObject;
