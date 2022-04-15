const React = require('react');
const { useState, useContext } = require('react')
const { render, useInput, useApp, Box, Text, Newline } = require('ink');
const BigText = require('ink-big-text');
const TextInput = require('ink-text-input').default;
const fs = require('fs');
const importJsx = require('import-jsx');

const {PageContext} = importJsx('./PageContext')

function TokenInput(params) {
    const [pat, setPAT] = useState('');
    const [error, setError] = useState('');

    const context = useContext(PageContext);
    const tokenrgx = /^ghp_[0-9a-zA-Z]{36}/

    useInput((input, key) => {
        if(key.return){
            if(tokenrgx.test(pat)){
                fs.writeFileSync(__dirname+`/../token`, pat)
                context.changePage("Dashboard")
            }

            else{
                setError("Wrong access token! Input again")
            }
            
            //TODO: Authenticate from here
            
        }
    })


    return (
        <Box flexDirection='column'>
            <Box marginRight={1}>
                <Text>Enter your Access Token:</Text>
            </Box>

            <TextInput value={pat} onChange={setPAT} />
            <Text color="red">{error ? error : ""}</Text>
        </Box>
    );
}

module.exports = TokenInput;