import Form from "next/form";
import Link from "next/link";
import { connection } from "next/server";
import { styled } from "restyle";

import { Button } from "../components/aria";
import { Create, Delete, Search } from "../components/icons";
import { findAllNotes } from "../lib/database";
import { runtime } from "../lib/effect";
import { getMainContent, getTitle } from "../lib/html";
import { theme } from "../lib/restyle";
import { insideFocusRing, outsideFocusRing } from "../lib/styles";

const StyledLink = styled(Link);
const StyledForm = styled(Form);

const HomePage = async ({ searchParams }: Readonly<{ searchParams: Promise<{ query?: string }> }>) => {
	await connection();

	const query = (await searchParams).query ?? "";

	const notes = await runtime.runPromise(findAllNotes(query));

	const mappedNotes = notes.map((note) => {
		let title = getTitle(note.content);
		let mainContent = getMainContent(note.content);

		if (title.length > 30) {
			title = `${title.slice(0, 30)}...`;
		}

		if (mainContent.length > 200) {
			mainContent = `${mainContent.slice(0, 200)}...`;
		}

		return {
			...note,
			mainContent,
			title,
		};
	});

	return (
		<>
			<StyledForm action="/" css={{ display: "flex", gap: 6, marginBlockEnd: 24 }} scroll={false}>
				<input
					css={{
						borderColor: theme.color.olive[8],
						borderRadius: 4,
						borderStyle: "solid",
						borderWidth: 2,
						paddingBlock: 6,
						paddingInline: 8,
						...insideFocusRing,
					}}
					defaultValue={query}
					key={query}
					name="query"
				/>
				<Button
					css={{
						"&[data-hovered]": {
							background: theme.color.grass[10],
						},
						alignItems: "center",
						aspectRatio: "1/1",
						background: theme.color.grass[9],
						borderRadius: 4,
						color: theme.color.olive[1],
						display: "flex",
						height: 36,
						justifyContent: "center",
						marginLeft: "auto",
						paddingBlock: 4,
						paddingInline: 8,
						...outsideFocusRing,
					}}
					type="submit"
				>
					<Search />
				</Button>
				<StyledLink
					css={{
						":hover": {
							background: theme.color.grass[10],
						},
						alignItems: "center",
						aspectRatio: "1/1",
						background: theme.color.grass[9],
						borderRadius: 4,
						color: theme.color.olive[1],
						display: "flex",
						height: 36,
						justifyContent: "center",
						paddingBlock: 4,
						paddingInline: 8,
						...outsideFocusRing,
					}}
					href="/"
				>
					<Delete />
				</StyledLink>
				<StyledLink
					css={{
						":hover": {
							background: theme.color.grass[10],
						},
						alignItems: "center",
						aspectRatio: "1/1",
						background: theme.color.grass[9],
						borderRadius: 4,
						color: theme.color.olive[1],
						display: "flex",
						height: 36,
						justifyContent: "center",
						paddingBlock: 4,
						paddingInline: 8,
						...outsideFocusRing,
					}}
					href="/note/new"
				>
					<Create />
				</StyledLink>
			</StyledForm>
			{mappedNotes.length > 0 ? (
				<ul
					css={{
						display: "flex",
						flexDirection: "column",
						gap: 6,
					}}
				>
					{mappedNotes.map((note) => {
						return (
							<li key={note.id}>
								<StyledLink
									css={{
										color: note.title.length > 0 ? theme.color.grass[12] : theme.color.olive[11],
										fontSize: 20,
										fontWeight: 500,
										textDecoration: "underline",
										textUnderlineOffset: 2,
									}}
									href={`/note/${note.id.toString()}`}
									prefetch
								>
									{note.title.length > 0 ? note.title : "No title"}
								</StyledLink>
								<p
									css={{
										color: note.mainContent.length > 0 ? undefined : theme.color.olive[11],
									}}
								>
									{note.mainContent.length > 0 ? note.mainContent : "No main content"}
								</p>
							</li>
						);
					})}
				</ul>
			) : (
				<p css={{ color: theme.color.olive[11], textAlign: "center" }}>
					{query.length > 0 ? "No notes found for your query" : "No notes created yet"}
				</p>
			)}
		</>
	);
};

export default HomePage;
