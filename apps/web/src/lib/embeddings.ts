import ollama from "ollama";

const MODEL = "gemma2";

export const generateEmbeddings = async (chunks: Array<string>) => {
	const result = await ollama.embed({
		input: chunks,
		model: MODEL,
	});

	return result.embeddings;
};
