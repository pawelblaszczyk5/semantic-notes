import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import * as cheerio from "cheerio";

import { invariant } from "@semantic-notes/invariant";

export const getTitle = (html: string) => {
	const $ = cheerio.load(html, {});

	const maybeTitle = $("body :first-child").prop("innerText");

	invariant(maybeTitle);

	return maybeTitle;
};

const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", { chunkOverlap: 20, chunkSize: 100 });

export const splitDocument = async (html: string) => {
	const chunks = await splitter.splitText(html);

	return chunks;
};
