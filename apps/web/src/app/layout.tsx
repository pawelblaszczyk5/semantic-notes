import type { Metadata } from "next";
import type { ReactNode } from "react";

import localFont from "next/font/local";
import { Suspense } from "react";

import { Reset, theme, Theme } from "../lib/restyle";

const geistSans = localFont({
	src: "../fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "../fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	description: "Simple app to make notes and semantically search them",
	title: "Semantic Notes",
} satisfies Metadata;

const MainLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<html className={`${geistSans.variable} ${geistMono.variable}`} lang="en">
			<head>
				<Reset />
				<Theme />
			</head>
			<body
				css={{
					backgroundColor: theme.color.olive[1],
					color: theme.color.olive[12],
					padding: 16,
				}}
			>
				<Suspense>{children}</Suspense>
			</body>
		</html>
	);
};

export default MainLayout;
