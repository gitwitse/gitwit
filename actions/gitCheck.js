const { execSync } = require("child_process");

const gitCheck = () => {
	try {
        let out = execSync('git rev-parse --is-inside-work-tree');
        return true
    } catch(err) {
        return false
    }
	
}

module.exports = gitCheck;