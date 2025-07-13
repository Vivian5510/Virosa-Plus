import { ref, computed, onMounted, onUnmounted } from 'vue'

// 标准化断点定义（与Tailwind CSS一致）
export const BREAKPOINTS = {
	xs: 0, // 超小屏幕
	sm: 640, // 小屏幕
	md: 768, // 中等屏幕
	lg: 1024, // 大屏幕
	xl: 1280, // 超大屏幕
	'2xl': 1536, // 超超大屏幕
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS

// 全局响应式状态
const windowWidth = ref(0)
const windowHeight = ref(0)

// 防抖函数
function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null
	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => func(...args), wait)
	}
}

// 更新窗口尺寸
function updateWindowSize() {
	windowWidth.value = window.innerWidth
	windowHeight.value = window.innerHeight
}

// 防抖的更新函数
const debouncedUpdateWindowSize = debounce(updateWindowSize, 100)

// 全局事件监听器管理
let listenerCount = 0

/**
 * 响应式设计组合函数
 * 提供统一的断点检测和屏幕尺寸管理
 */
export function useResponsive() {
	// 增加监听器计数
	listenerCount++

	onMounted(() => {
		// 首次初始化
		updateWindowSize()

		// 只在第一个组件时添加监听器
		if (listenerCount === 1) {
			window.addEventListener('resize', debouncedUpdateWindowSize)
		}
	})

	onUnmounted(() => {
		// 减少监听器计数
		listenerCount--

		// 当没有组件使用时移除监听器
		if (listenerCount === 0) {
			window.removeEventListener('resize', debouncedUpdateWindowSize)
		}
	})

	// 计算当前断点
	const currentBreakpoint = computed<BreakpointKey>(() => {
		const width = windowWidth.value
		if (width >= BREAKPOINTS['2xl']) return '2xl'
		if (width >= BREAKPOINTS.xl) return 'xl'
		if (width >= BREAKPOINTS.lg) return 'lg'
		if (width >= BREAKPOINTS.md) return 'md'
		if (width >= BREAKPOINTS.sm) return 'sm'
		return 'xs'
	})

	// 便捷的断点检测函数
	const isXs = computed(() => currentBreakpoint.value === 'xs')
	const isSm = computed(() => currentBreakpoint.value === 'sm')
	const isMd = computed(() => currentBreakpoint.value === 'md')
	const isLg = computed(() => currentBreakpoint.value === 'lg')
	const isXl = computed(() => currentBreakpoint.value === 'xl')
	const is2Xl = computed(() => currentBreakpoint.value === '2xl')

	// 范围检测函数
	const isMobile = computed(() => windowWidth.value < BREAKPOINTS.md) // xs, sm
	const isTablet = computed(
		() =>
			windowWidth.value >= BREAKPOINTS.md && windowWidth.value < BREAKPOINTS.lg,
	) // md
	const isDesktop = computed(() => windowWidth.value >= BREAKPOINTS.lg) // lg, xl, 2xl

	// 最小宽度检测
	const isMinSm = computed(() => windowWidth.value >= BREAKPOINTS.sm)
	const isMinMd = computed(() => windowWidth.value >= BREAKPOINTS.md)
	const isMinLg = computed(() => windowWidth.value >= BREAKPOINTS.lg)
	const isMinXl = computed(() => windowWidth.value >= BREAKPOINTS.xl)
	const isMin2Xl = computed(() => windowWidth.value >= BREAKPOINTS['2xl'])

	// 最大宽度检测
	const isMaxSm = computed(() => windowWidth.value < BREAKPOINTS.md)
	const isMaxMd = computed(() => windowWidth.value < BREAKPOINTS.lg)
	const isMaxLg = computed(() => windowWidth.value < BREAKPOINTS.xl)
	const isMaxXl = computed(() => windowWidth.value < BREAKPOINTS['2xl'])

	return {
		// 原始数据
		windowWidth: readonly(windowWidth),
		windowHeight: readonly(windowHeight),
		currentBreakpoint,

		// 精确断点
		isXs,
		isSm,
		isMd,
		isLg,
		isXl,
		is2Xl,

		// 设备类型
		isMobile,
		isTablet,
		isDesktop,

		// 最小宽度
		isMinSm,
		isMinMd,
		isMinLg,
		isMinXl,
		isMin2Xl,

		// 最大宽度
		isMaxSm,
		isMaxMd,
		isMaxLg,
		isMaxXl,

		// 工具函数
		isBreakpoint: (bp: BreakpointKey) =>
			computed(() => currentBreakpoint.value === bp),
		isMinBreakpoint: (bp: BreakpointKey) =>
			computed(() => windowWidth.value >= BREAKPOINTS[bp]),
		isMaxBreakpoint: (bp: BreakpointKey) =>
			computed(() => windowWidth.value < BREAKPOINTS[bp]),
	}
}

// 便捷导出
export { windowWidth, windowHeight }
