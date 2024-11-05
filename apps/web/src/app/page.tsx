import { Editor } from "../components/editor";

const HomePage = () => {
	return (
		<div
			css={{
				margin: "0 auto",
				maxWidth: "80ch",
			}}
		>
			<Editor />
		</div>
	);
};

export default HomePage;
