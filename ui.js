"use strict";
const React = require("react");

const { useEffect, useState, useRef } = require("react");
const { Text, Box, measureElement, Newline, Spacer, useApp, useInput } = require("ink");

const Renderer = require("./components/Divider");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");

const fs = require('fs')

const importJsx = require("import-jsx");
const Selector = importJsx("./Selector.js");
const Logo = importJsx("./components/Logo")

const gitCheck = require("./actions/gitCheck")
const gitBranchCall = require("./currentBranch");
const gitStatusPull = require('./actions/gitStatusPull')
const gitStatusProcess = require('./actions/gitStatusProcess')
const gitBranchVisualPull = require('./actions/gitBranchVisualPull')
const gitBranchVisualProcess = require('./actions/gitBranchVisualProcess')

const { PageProvider } = importJsx('./components/PageContext')

const Trending = importJsx('./components/Trending')
const TokenInput = importJsx('./components/TokenInput')

const path = __dirname + '/token'


const {showLogo, defaultColor, accentColor, appResize, changeBold, changeBorder, selectorColor} = require('./styleFile')

const Dashboard = () => {
	const [status, setStatus] = useState("");
	const [branch, setBranch] = useState("");
	const [visual, setVisual] = useState("");
	const [appWidth, setWidth] = useState(null);
	const [treeHeight, setTreeHeight] = useState(null)
	const [appheight, setHeight] = useState("50")

	const ref = useRef(null);

	useEffect(() => {
		const intervalStatusCheck = setInterval(() => {
			setStatus(gitStatusPull());
			setBranch(gitBranchCall());
			setVisual(gitBranchVisualPull());
			if (appResize) {setHeight(process.stdout.rows)}
			const { width, height } = measureElement(ref.current);
			setWidth(width);
			setTreeHeight(height)
		}, 1000);
		if (!appResize) {setHeight(process.stdout.rows)}

		return () => {
			clearInterval(intervalStatusCheck);
		};
	}, []);

	const statusProcessed = gitStatusProcess(status)
	const visualProcessed = gitBranchVisualProcess(visual, treeHeight, appWidth)

	
	return (
		<Box flexDirection="column" minHeight={appheight}>
			{showLogo && <Logo />}
			<Selector defaultColor={selectorColor} accentColor={accentColor} />
			<Box
				borderStyle={changeBorder} //HERE IS THE CURRENT BORDER TO CHANGE
				borderColor={accentColor}
				className="full-app"
				height={20}
				flexGrow={1}
			>
				<Box
					className="left-box"
					width="50%"
					height="100%"
					flexDirection="column"
					ref={ref}
				// flexGrow={1}
				>
					<Box className="changed-files" height="50%">
						<Box height="100%">
							<Box flexDirection="column" alignItems="flex-start">
								<Text color={accentColor} bold underline>
									Unstaged Changes
								</Text>
									{statusProcessed.unstaged.map(file => <Box alignItems="flex-start" key={file}><Text color={defaultColor}>{file}</Text></Box>)}
							</Box>
						</Box>
					</Box>
					<Text color={accentColor}>
						<Newline />
						<Renderer width={appWidth} />
					</Text>

					<Box className="stage-area" height="50%">
						<Box height="100%">
							<Box flexDirection="column" alignItems="flex-start">
								<Text color={accentColor} bold underline>
									Staged Changes
								</Text>
								{statusProcessed.staged.map(file => <Box alignItems="flex-start" key={file}><Text color={defaultColor}>{file}</Text></Box>)}
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					className="gitBranch left-box"
					borderStyle={changeBorder} //ALSO HERE
					borderColor={accentColor}
					width="65%"
					margin="-1"
					flexDirection="column"
				>
					<Box flexDirection="row">
						<Text color={accentColor} bold underline>
							Git Branch --{">"}
						</Text>
						<Text color={defaultColor}> {branch}</Text>
						<Spacer />
						<Text color={defaultColor}>Newest to Oldest </Text>
					</Box>
					<Box flexDirection="row">
						<Text color={defaultColor} bold={changeBold}>
							{visualProcessed.sorted}
						</Text>
						<Text> </Text>
					</Box>
				</Box>
			</Box>
			
			<Newline />
			
		</Box>
	);
};

const App = () => {
	const [currPage, setPage] = useState("")
	const [error, setError] = useState("")

	const {exit} = useApp()

	useInput((input, key) => {
		if(key.ctrl  && (input === 'q' || input === 'Q')){
			fs.unlinkSync(path)
			exit()
		}
	})

	let Component;

	switch (currPage) {
		case "Dashboard":
			Component = <Dashboard />
			break;
		
		case "TokenInput":
			Component = <TokenInput/>
			break;

		case "Trending":
			Component = <Trending/>
			break;
		default:
			Component = <TokenInput />;
			break;
	}

	useEffect(() => {
		if(gitCheck){
			if (fs.existsSync(path)) {
				setPage("Dashboard")
			}
			else {
				setPage("TokenInput")
			}
		}
		else{
			setError("Directory is not a git repository!")
		}
		
	}, [])

	return (
		<PageProvider value={{ currPage, changePage: setPage }}>
			<Box >
				{error ? <Text>{error}</Text>  : Component}
				
			</Box>
			<Text>Press <Text bold>Ctrl + Q</Text> to Logout and Exit </Text>
		</PageProvider>
	);


}

module.exports = App;
