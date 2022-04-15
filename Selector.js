const React = require("react");
const {useContext} = require('react');
const { useState, useEffect } = require("react");
const { Box, useInput, useFocus, useFocusManager  } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const importJsx = require("import-jsx");

const TreeTab = importJsx('./components/TreeTab')
const revertTab = require("./actions/revertStaged");
const stageFiles = require("./actions/stageFiles");
const pushTab = require("./actions/pushTab");
const pullTab = require("./actions/pullBranch");

const CheckoutBranch = importJsx("./components/CheckoutBranch");
const CommitAction = importJsx("./components/Commit");
const StageSomeFiles = importJsx('./components/StageChanges')
const DeleteTab = importJsx("./components/DeleteBranch");
const CommitRevert = importJsx('./components/CommitRevert')
const Repositories = importJsx('./components/Repositories')

const {PageContext} = importJsx('./components/PageContext')

const Selector = ({defaultColor, accentColor}) => {
	const [currentTab, setCurrentTab] = useState("");
	const context = useContext(PageContext);

	let {isFocused} = useFocus();
	const {disableFocus, enableFocus}  = useFocusManager();

	useInput((input, key) => {
		if (key.escape) {
			return setCurrentTab("");
		}
	});


	const handleSelect = (item) => {
		setCurrentTab(item.value);
		if (item.value === "pushStagedChanges") {
			pushTab();
		}
		if (item.value === "stageAll") {
			stageFiles();
		}
		if (item.value === "revertStagedChanges") {
			revertTab();
		}
		if (item.value === "pullFromBranch") {
			pullTab();
		}
		if (item.value === 'stageSome') {
			isFocused = true;
		}
	};

	const items = [
		{
			label: "Stage Changes",
			value: "stageSome",
		},
		{
			label: "Commit Changes",
			value: "commitChanges",
		},
		{
			label: "Push Staged Changes",
			value: "pushStagedChanges",
		},
		{
			label: "Pull From Branch",
			value: "pullFromBranch",
		},
		{
			label: "Checkout Branch",
			value: "checkoutBranch",
		},
		{
			label: "Delete Branch",
			value: "deleteBranch",
		},
		{
			label: 'Undo Commit',
			value: 'undoCommit'
		},
		{
			label: 'Repositories',
			value: 'getRepos'
		},
		{
			label: 'Trending',
			value: 'trending'
		}
		
	];

	switch (currentTab) {
		case "checkoutBranch":
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor} />
					<CheckoutBranch refreshTab={setCurrentTab} />
				</Box>
			);
		case "commitChanges":
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					<CommitAction refreshTab={setCurrentTab} />
				</Box>
			)
		case 'stageSome':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor} />
					<StageSomeFiles refreshTab={setCurrentTab} defaultColor={defaultColor} accentColor={accentColor} />
				</Box>
			)

		case 'deleteBranch':
			return (
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					<DeleteTab refreshTab={setCurrentTab} />
				</Box>
			)
		case 'undoCommit':
			return(
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					<CommitRevert refreshTab={setCurrentTab}/>
				</Box>
			)
		case 'getRepos':
			return(
				<Box flexDirection="column">
					<SelectInput items={items} isFocused={false} defaultColor={defaultColor} accentColor={accentColor}/>
					{/* TODO: Add repo component here */}
					<Repositories refreshTab={setCurrentTab} defaultColor={defaultColor} accentColor={accentColor}/>
				</Box>
			)

		case 'trending':
			context.changePage("Trending")
		default:
			return <SelectInput items={items} defaultColor={defaultColor} accentColor={accentColor} onSelect={handleSelect} />;
	}
};

module.exports = Selector;
