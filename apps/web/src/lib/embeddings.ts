import ollama from "ollama";

// cspell:ignore mxbai
const MODEL = "mxbai-embed-large";

export const generateEmbeddings = async (chunks: Array<string>) => {
	const result = await ollama.embed({
		input: chunks,
		model: MODEL,
	});

	return result.embeddings;
};
