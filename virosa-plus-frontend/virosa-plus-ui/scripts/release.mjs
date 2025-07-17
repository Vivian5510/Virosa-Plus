import { createConsola } from 'consola'
import { execSync } from 'child_process'
import { simpleGit } from 'simple-git'
import { gray } from 'kolorist'
// 需要使用动态导入获取 package.json 的内容
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJson = JSON.parse(
	readFileSync(join(__dirname, '../package.json'), 'utf8'),
)
const { repository } = packageJson

const logger = createConsola().withTag('release')

/**
 * 自动发版
 * @param {import('plop').NodePlopAPI} plop
 */
export default async function release(plop) {
	const git = simpleGit()

	const remotes = await git.getRemotes(true)

	const urls = remotes.map((r) => {
		return r.refs.push
			.replace('git@github.com:', 'https://github.com/')
			.replace('.git', '')
	})
	let allowRelease = false
	if (!urls.includes(repository.url)) {
		allowRelease = await logger.prompt(`是否发布到 ${gray(repository.url)}`, {
			type: 'confirm',
		})
	} else {
		allowRelease = true
	}

	if (allowRelease) {
		plop.setGenerator('controller', {
			description: '自动发版',
			prompts: [
				{
					name: 'type',
					type: 'list',
					default: 'patch',
					message: '你希望发布一个什么版本?',
					choices: [
						'patch',
						'minor',
						'major',
						'prepatch',
						'premajor',
						'preminor',
						'prerelease',
					],
				},
			],
			actions(answer) {
				const { type } = answer
				execSync(
					`npx changelogen --${type} --release && git push --follow-tags`,
					{
						stdio: 'inherit',
					},
				)
				return []
			},
		})
	}
}
