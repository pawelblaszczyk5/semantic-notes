import ollama from "ollama";

const MODEL = "snowflake-arctic-embed";

export const generateEmbeddings = async (chunks: Array<string>) => {
	const result = await ollama.embed({
		input: chunks,
		model: MODEL,
	});

	return result.embeddings;
};
