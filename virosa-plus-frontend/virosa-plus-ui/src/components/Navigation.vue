<script setup lang="ts">
import { SwitchIcon } from 'vue-dark-switch'
import MorphingTabs from '~/components/inspira/miscellaneous/MorphingTabs.vue'
import DockIcon from '~/components/inspira/dock/DockIcon.vue'
import Dock from '~/components/inspira/dock/Dock.vue'
import GitHubIcon from '~/components/common/icons/GitHubIcon.vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const routes = [
	{ path: '/', name: 'home', icon: '🏠', label: '首页' },
	{ path: '/article', name: 'article', icon: '📝', label: '文章' },
	{ path: '/inspiration', name: 'inspiration', icon: '💡', label: '灵感' },
	{ path: '/aboutme', name: 'about', icon: '👤', label: '关于' },
]

const route = useRoute()
const router = useRouter()
const activeTab = ref(
	routes.find((r) => r.path.startsWith(route.path))?.name || 'home',
)

// 监听路由变化更新活动标签
watch(
	() => route.path,
	(newPath) => {
		const matchedRoute = routes.find(
			(r) =>
				r.path === newPath || (r.path !== '/' && newPath.startsWith(r.path)),
		)
		if (matchedRoute) {
			activeTab.value = matchedRoute.name
		}
	},
)

const goToLink = (to: string) => {
	if (to.startsWith('http')) {
		window.location.href = to
	} else {
		router.push(to)
	}
}

// 导航到路由并关闭菜单
const navigateTo = (path: string) => {
	console.log('导航到:', path)
	mobileMenuOpen.value = false

	// 使用setTimeout确保先关闭菜单，然后再导航
	setTimeout(() => {
		router.push(path)
	}, 10)
}

// 响应式断点控制
const screenSize = ref('xl')
const isMobileView = ref(false)
const isTabletView = ref(false)
const isDesktopView = ref(false)
const mobileMenuOpen = ref(false)

// 性能优化：使用防抖来限制resize事件的处理频率
function debounce(func: Function, wait: number) {
	let timeout: ReturnType<typeof setTimeout>
	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout)
			func(...args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

// 创建防抖版本的检查函数
const debouncedCheckScreenSize = debounce(checkScreenSize, 150)

onMounted(() => {
	checkScreenSize()
	window.addEventListener('resize', debouncedCheckScreenSize)

	// 监听路由变化时关闭移动端菜单
	watch(
		() => route.path,
		() => {
			if (mobileMenuOpen.value) {
				closeMobileMenu()
			}
		},
	)
})

onUnmounted(() => {
	window.removeEventListener('resize', debouncedCheckScreenSize)
})

// 检查屏幕尺寸并设置响应式状态
function checkScreenSize() {
	const width = window.innerWidth

	if (width < 480) {
		screenSize.value = 'xs'
		isMobileView.value = true
		isTabletView.value = false
		isDesktopView.value = false
	} else if (width < 640) {
		screenSize.value = 'sm'
		isMobileView.value = true
		isTabletView.value = false
		isDesktopView.value = false
	} else if (width < 768) {
		screenSize.value = 'md'
		isMobileView.value = false
		isTabletView.value = true
		isDesktopView.value = false
	} else if (width < 1024) {
		screenSize.value = 'lg'
		isMobileView.value = false
		isTabletView.value = true
		isDesktopView.value = false
	} else {
		screenSize.value = 'xl'
		isMobileView.value = false
		isTabletView.value = false
		isDesktopView.value = true
	}
}

// 切换移动端菜单
function toggleMobileMenu() {
	mobileMenuOpen.value = !mobileMenuOpen.value
}

// 关闭移动端菜单
function closeMobileMenu() {
	mobileMenuOpen.value = false
}

// 键盘导航支持
function handleKeyDown(event: KeyboardEvent) {
	if (!mobileMenuOpen.value) return

	if (event.key === 'Escape') {
		closeMobileMenu()
		event.preventDefault()
	}
}

// 挂载键盘事件监听
onMounted(() => {
	document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
	document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
	<nav
		aria-label="Site Navigation"
		:class="[
			'sticky top-0 z-50 transition-all duration-300 border-b',
			{
				// 移动端：更清晰的背景，减少模糊
				'backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-gray-200/70 dark:border-gray-700/70':
					isMobileView,
				// 桌面端：保持毛玻璃效果
				'backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50':
					!isMobileView,
				'shadow-lg': mobileMenuOpen,
			},
		]"
	>
		<div class="mx-auto max-w-7xl">
			<!-- 桌面和平板导航 -->
			<div
				v-if="!isMobileView"
				class="flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4"
			>
				<!-- 左侧：主题切换 -->
				<div class="flex items-center">
					<SwitchIcon
						unmount-persets
						class="transform transition-transform hover:scale-110"
					/>
				</div>

				<!-- 中间：导航标签 -->
				<div class="flex flex-1 justify-center">
					<div
						:class="[
							'transition-all duration-300',
							{
								'scale-90': isTabletView,
								'scale-100': isDesktopView,
							},
						]"
					>
						<MorphingTabs
							:tabs="routes"
							:active-tab="activeTab"
							:class="[
								'mx-auto transition-all duration-300',
								{
									'scale-90': screenSize === 'md',
									'scale-95': screenSize === 'lg',
									'scale-100': screenSize === 'xl',
								},
							]"
							:margin="isTabletView ? 15 : 20"
							:blur-std-deviation="isTabletView ? 4 : 6"
							:compact="screenSize === 'md'"
							:use-goo-effect="screenSize === 'xl'"
							@update:active-tab="activeTab = $event"
						/>
					</div>
				</div>

				<!-- 右侧：Dock和下拉菜单 -->
				<div class="flex items-center gap-3">
					<Dock
						:class="[
							'transition-all duration-300',
							{
								'scale-75 mb-2': isTabletView,
								'scale-90 mb-3': screenSize === 'lg',
								'scale-100 mb-4': isDesktopView,
							},
						]"
						class="dark:border-zinc-800"
						direction="'bottom'"
					>
						<DockIcon>
							<GitHubIcon @click="goToLink('https://github.com/Vivian5510')" />
						</DockIcon>
						<DockIcon>
							<img src="/svg/message.svg" @click="goToLink('/comment')" />
						</DockIcon>
						<DockIcon>
							<img src="/svg/issue.svg" @click="goToLink('/issue')" />
						</DockIcon>
					</Dock>

					<div
						:class="isTabletView ? 'scale-90' : 'scale-100'"
						class="transition-transform duration-300"
					>
						<Dropdown />
					</div>
				</div>
			</div>

			<!-- 移动端导航 -->
			<div v-else class="px-4 py-3">
				<div class="flex items-center justify-between">
					<!-- 左侧：Logo或标题 -->
					<div class="flex items-center gap-3">
						<SwitchIcon unmount-persets class="scale-90" />
						<span
							class="text-lg text-gray-900 font-bold drop-shadow-sm dark:text-white"
							>Virosa</span
						>
					</div>

					<!-- 右侧：汉堡菜单和工具 -->
					<div class="flex items-center gap-2">
						<!-- 语言切换 -->
						<div class="scale-75">
							<Dropdown />
						</div>

						<!-- 汉堡菜单按钮 -->
						<button
							:class="[
								'relative w-8 h-8 flex flex-col justify-center items-center',
								'transition-all duration-300 ease-in-out',
								'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1',
								{
									'transform rotate-180': mobileMenuOpen,
								},
							]"
							aria-label="Toggle mobile menu"
							@click="toggleMobileMenu"
						>
							<span
								:class="[
									'block h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 drop-shadow-sm',
									{
										'rotate-45 translate-y-1': mobileMenuOpen,
										'-translate-y-1': !mobileMenuOpen,
									},
								]"
							></span>
							<span
								:class="[
									'block h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 drop-shadow-sm',
									{
										'opacity-0': mobileMenuOpen,
										'opacity-100': !mobileMenuOpen,
									},
								]"
							></span>
							<span
								:class="[
									'block h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 drop-shadow-sm',
									{
										'-rotate-45 -translate-y-1': mobileMenuOpen,
										'translate-y-1': !mobileMenuOpen,
									},
								]"
							></span>
						</button>
					</div>
				</div>

				<!-- 移动端下拉菜单 -->
				<Transition
					name="mobile-menu"
					enter-active-class="transition-all duration-300 ease-out"
					enter-from-class="opacity-0 -translate-y-4 scale-95"
					enter-to-class="opacity-100 translate-y-0 scale-100"
					leave-active-class="transition-all duration-200 ease-in"
					leave-from-class="opacity-100 translate-y-0 scale-100"
					leave-to-class="opacity-0 -translate-y-4 scale-95"
				>
					<div
						v-if="mobileMenuOpen"
						class="relative z-50 mt-4 border-t border-gray-200 rounded-b-2xl bg-white py-4 shadow-lg dark:border-gray-700 dark:bg-gray-900"
					>
						<!-- 导航链接 - 完全重构 -->
						<div class="mb-6 space-y-1">
							<div
								v-for="routeItem in routes"
								:key="routeItem.path"
								class="px-2"
							>
								<button
									type="button"
									class="nav-button text-decoration-none relative z-10 block w-full flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
									:class="{
										'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400':
											activeTab === routeItem.name,
									}"
									@click="navigateTo(routeItem.path)"
								>
									<span class="text-2xl">{{ routeItem.icon }}</span>
									<span class="text-lg font-medium">{{ routeItem.label }}</span>
									<span
										v-if="activeTab === routeItem.name"
										class="ml-auto h-2 w-2 rounded-full bg-blue-500"
									></span>
								</button>
							</div>
						</div>

						<!-- 快捷操作 - 简化 -->
						<div class="px-4">
							<div
								class="mb-3 text-sm text-gray-500 font-medium dark:text-gray-400"
							>
								快捷操作
							</div>
							<div class="grid grid-cols-3 gap-3">
								<a
									href="https://github.com/Vivian5510"
									target="_blank"
									rel="noopener noreferrer"
									class="text-decoration-none flex flex-col items-center gap-2 rounded-lg bg-gray-50 p-3 transition-colors dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<GitHubIcon class="h-5 w-5" />
									<span class="text-xs font-medium">GitHub</span>
								</a>
								<button
									type="button"
									class="nav-button text-decoration-none relative z-10 flex flex-col cursor-pointer items-center gap-2 rounded-lg bg-gray-50 p-3 transition-colors dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
									@click="navigateTo('/comment')"
								>
									<img src="/svg/message.svg" class="h-5 w-5" />
									<span class="text-xs font-medium">留言</span>
								</button>
								<button
									type="button"
									class="nav-button text-decoration-none relative z-10 flex flex-col cursor-pointer items-center gap-2 rounded-lg bg-gray-50 p-3 transition-colors dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
									@click="navigateTo('/issue')"
								>
									<img src="/svg/issue.svg" class="h-5 w-5" />
									<span class="text-xs font-medium">问题</span>
								</button>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</div>

		<!-- 点击遮罩关闭移动端菜单 -->
		<Transition
			name="overlay"
			enter-active-class="transition-opacity duration-300"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity duration-200"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="mobileMenuOpen && isMobileView"
				class="fixed inset-0 z-40 bg-black/10"
				@click="closeMobileMenu"
			></div>
		</Transition>
	</nav>
</template>

<style scoped>
.nav-item {
	@apply flex items-center transform-gpu;
}

/* 确保导航按钮可点击 */
.nav-button {
	position: relative;
	z-index: 10;
	pointer-events: auto;
	touch-action: manipulation;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0.2);
}

/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
	transform-origin: top center;
}

/* 覆盖层动画 */
.overlay-enter-active,
.overlay-leave-active {
	transition: opacity 0.3s ease;
}

/* 增强触摸友好性 */
@media (hover: none) and (pointer: coarse) {
	/* 移动设备上增加触摸目标大小 */
	.nav-item button,
	button[type='button'] {
		min-height: 44px;
		min-width: 44px;
	}

	.mobile-menu-item {
		min-height: 48px;
	}

	/* 增加点击区域 */
	.nav-button::before {
		content: '';
		position: absolute;
		top: -10px;
		left: -10px;
		right: -10px;
		bottom: -10px;
		z-index: -1;
	}
}

/* 减少动画在低性能设备上的影响 */
@media (prefers-reduced-motion: reduce) {
	* {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
	.nav-item {
		border: 2px solid;
	}
}

/* 确保在所有设备上都能正确渲染毛玻璃效果 */
@supports not (backdrop-filter: blur(10px)) {
	nav {
		background: rgba(255, 255, 255, 0.95);
	}

	.dark nav {
		background: rgba(17, 24, 39, 0.95);
	}
}
</style>
