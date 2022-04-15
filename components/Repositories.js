const React = require("react");
const { useEffect, useState, useRef } = require("react");
const { Text, Box, Newline } = require("ink");
const SelectInput = require("ink-select-input-horizontal").default;
const { execSync, exec } = require("child_process");
const importJsx = require("import-jsx");
const open = require('open')

const {getUserRepositories, getTrending} = require('../actions/api')

const Repositories = ({ refreshTab, accentColor, defaultColor }) => {
    const [currentDrop, setCurrentDrop] = useState('')
    const [items, setItems] = useState([])

    const handleSelect = (item) => {
        open(item.value)
    }

    // TODO: Get repos from API

    useEffect(async () => {
        let repos = await getUserRepositories()
        let finalRepos = []
        
        repos.forEach(
            obj  => finalRepos.push({
                label: obj.name,
                value: obj.html_url
            })
        )
        setItems(finalRepos)
    }, [])


    return (
        <Box flexDirection="column" marginLeft='109' >
            <SelectInput items={items} onSelect={handleSelect} displayDirection='column' defaultColor={defaultColor} accentColor={accentColor} />
            {/* <Text>{JSON.stringify(items)}</Text> */}
            <Newline />
            <Text color='gray'>Press ESC to go back</Text>
        </Box>
    )
};

module.exports = Repositories