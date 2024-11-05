import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import * as cheerio from "cheerio";

export const getTitle = (html: string) => {
	const $ = cheerio.load(html, {});

	return $("body :first-child").text();
};

const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", { chunkOverlap: 20, chunkSize: 100 });

export const splitDocument = async (html: string) => {
	const chunks = await splitter.splitText(html);

	return chunks;
};
