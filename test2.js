const {execSync} = require('child_process')

let branches = execSync(
    "git for-each-ref --format='%(refname:short)' refs/heads/"
)
    .toString()
    .split("\n");

console.log(branches)

