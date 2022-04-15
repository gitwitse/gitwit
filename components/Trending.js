const React = require("react");
const { useState, useEffect, useContext } = require("react");
const importJsx = require("import-jsx");
const { Text, Box, Newline, useInput, useApp } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const { getTrending } = require("../actions/api");
const { defaultColor, accentColor, selectorColor } = require("../styleFile");
const open = require("open");
const axios = require('axios');

const { PageContext } = importJsx("./PageContext");

const Trending = () => {
	const { exit } = useApp();
	const [items, setItems] = useState([]);
	const [error, setError] = useState("");
	const context = useContext(PageContext);

	const handleSelect = (item) => {
		open(item.value);
	};

	useEffect(async () => {
		const dayOfYear = (date) =>
			Math.floor(
				(date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
			);
		axios
			.get("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
			.then((res) => {
				let truedate = res.data.day_of_year;
				if (truedate != dayOfYear(new Date())) {
					setError("WRONG SYS DATE");
				} else {
					setError("")
				}
			});

		let data = await getTrending();
		let finalRepos = [];

		data.forEach((obj) =>
			finalRepos.push({
				label:
					(obj.full_name + ": " + obj.description).substring(0, 46) + "...", //TODO: Add description and stuff
				value: obj.html_url,
			})
		);
		setItems(finalRepos);
	}, []);

	useInput((input, key) => {
		if (input === "q") exit();
		if (key.escape) context.changePage("Dashboard");
	});
	return (
		<Box
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			width="100%"
		>
			<Gradient name="teen">
				<BigText text="Trending" />
			</Gradient>
			<Box flexDirection="column" alignItems="center">
				{error ? (
					<Text color="red">{error}</Text>
				) : (
					<SelectInput
						items={items}
						onSelect={handleSelect}
						displayDirection="column"
						defaultColor={defaultColor}
						accentColor={selectorColor}
					/>
				)}

				<Newline />
				<Text color="cyan">
					Press enter to open a repo on your default browser
				</Text>
				<Text bold color="cyan">
					Press Esc to go back
				</Text>
			</Box>
		</Box>
	);
};

module.exports = Trending;
