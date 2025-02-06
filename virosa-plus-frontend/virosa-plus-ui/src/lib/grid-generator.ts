// 定义 Feature 数据结构
export interface Feature {
	cta: string
	name: string
	description: string
	href: string
	image?: string
}

export interface FeatureWithLayout extends Feature {
	class: string
}

const MAX_COLUMNS = 3 // 最大列数
const MAX_ROWS = 100 // 设定一个合理的最大行数

export function generateGridLayout(features: Feature[]): FeatureWithLayout[] {
	let grid: boolean[][] = Array.from({ length: MAX_ROWS }, () =>
		Array(MAX_COLUMNS).fill(false),
	)
	let fullRowNo: number = 0
	let occupiedRowsNum: number = 0
	let layout: FeatureWithLayout[] = []

	// 放置块
	const placeBlock = (
		row: number,
		col: number,
		width: number,
		height: number,
	): void => {
		for (let r = row; r < row + height; r++) {
			for (let c = col; c < col + width; c++) {
				grid[r - 1][c - 1] = true // 标记为占用
				console.log(r + ', ' + c)
			}
		}
	}

	// 逐个处理 feature
	for (const feature of features) {
		//如果已经填平，就随机生成
		if (occupiedRowsNum == 0) {
			let r = fullRowNo + 1
			let c = Math.floor(Math.random() * 3) + 1
			let width = Math.floor(Math.random() * (4 - c)) + 1
			const height = Math.floor(Math.random() * 3) + 1
			placeBlock(r, c, width, height)
			const itemClass = `lg:col-start-${c} lg:col-end-${c + width} lg:row-start-${r} lg:row-end-${r + height} `
			console.log(feature.name)
			console.log(itemClass)
			layout.push({ ...feature, class: itemClass })
			occupiedRowsNum = height
			if (width == 3) {
				fullRowNo += height
				occupiedRowsNum = 0
			}
		} else {
			let r = fullRowNo + 1
			let height = occupiedRowsNum
			let c = 0
			let width = 0
			if (!grid[r - 1][0] && !grid[r - 1][1]) {
				console.log('x1')
				c = 1
				width = 2
			} else if (!grid[r - 1][0]) {
				console.log('x2')
				c = 1
				width = 1
			} else if (!grid[r - 1][1]) {
				console.log('x3')
				c = 2
				width = 2
			} else {
				console.log('x4')
				c = 3
				width = 1
			}

			placeBlock(r, c, width, height)
			const itemClass = `lg:col-start-${c} lg:col-end-${c + width} lg:row-start-${r} lg:row-end-${r + height}`
			console.log(feature.name)
			console.log(itemClass)
			console.log(
				grid[r - 1][0] + '&&' + grid[r - 1][1] + '&&' + grid[r - 1][2],
			)
			layout.push({ ...feature, class: itemClass })

			if (grid[r - 1][0] && grid[r - 1][1] && grid[r - 1][2]) {
				fullRowNo += occupiedRowsNum
				occupiedRowsNum = 0
			}
		}
	}
	console.log(grid)

	return layout
}
