import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import * as cheerio from "cheerio";

export const getTitle = (html: string) => {
	const $ = cheerio.load(html, {});

	return $("h1").text();
};

export const getMainContent = (html: string) => {
	const $ = cheerio.load(html, {});

	$("h1").remove();

	return $.text();
};

const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", { chunkOverlap: 20, chunkSize: 100 });

export const splitDocument = async (html: string) => {
	const chunks = await splitter.splitText(html);

	return chunks;
};
