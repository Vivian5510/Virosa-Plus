import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerVariantGroup,
	transformerDirectives,
} from 'unocss'

import presetAutoprefixer from './presets/autoprefixer'

// 使用类型断言来应用配置
export default defineConfig({
	transformers: [transformerDirectives(), transformerVariantGroup()],
	presets: [
		presetAttributify(),
		presetIcons({
			autoInstall: true,
		}),
		presetUno(),
		presetTypography(),
		presetAutoprefixer(),
	],
	// 将 rules 数组设置为空，消除 labeled variant 的使用
	rules: [],
})
