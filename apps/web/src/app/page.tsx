import { css } from "@semantic-notes/css";
import { Button } from "@semantic-notes/design-system/button";

const HomePage = () => {
	return (
		<>
			<h1 style={css({ "--color": "var(--color_blue12)" })}>Hello world</h1>
			<Button />
		</>
	);
};

export default HomePage;
