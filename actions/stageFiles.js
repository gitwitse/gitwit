const {execSync}=require("child_process")
const {stat} = require("fs")

const stageFiles = () => {
    let revert = execSync(
        'git add .'
    )
}

module.exports = stageFiles
