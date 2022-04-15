const { execSync } = require('child_process')

const gitBranchVisualPull = () => {
	let gitBranchVisualPull = ''
	try {

		gitBranchVisual = execSync(
			'git log --pretty=format:"%s" --graph --decorate'
			).toString()

		} catch (error) {
			return ''
		}
		return gitBranchVisual
}

module.exports = gitBranchVisualPull
