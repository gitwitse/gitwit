const React = require("react");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const { Text, Box } = require("ink");

const Logo = () => {
	return (
		<Box justifyContent="center">
			<Gradient name="teen">
				<BigText text="git-wit" />
			</Gradient>
		</Box>
	)
}

module.exports = Logo
