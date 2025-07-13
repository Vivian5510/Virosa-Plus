<script setup lang="ts">
import { File, Folder, Tree } from '~/components/inspira/miscellaneous/FileTree'
import { NodeService } from '~/composables/apiService'
import { useResponsive } from '~/composables/useResponsive'

definePage({
	alias: ['/article'],
})

import { isDark } from 'vue-dark-switch'

// 使用统一的响应式管理
const { isMobile, isTablet, isDesktop } = useResponsive()

// 响应式布局配置
const layoutConfig = computed(() => {
	if (isMobile.value) {
		return {
			showSidebar: false,
			showRightPanel: false,
			containerClass: 'flex flex-col w-full max-w-full overflow-x-hidden',
			mainClass: 'w-full max-w-full p-2 sm:p-4',
			bentoGridClass: 'grid auto-rows-[18rem] grid-cols-1 gap-3 w-full',
			sidebarClass:
				'w-full max-w-full p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700',
		}
	} else if (isTablet.value) {
		return {
			showSidebar: true,
			showRightPanel: false,
			containerClass: 'flex w-full max-w-full overflow-x-hidden',
			mainClass: 'flex-1 min-w-0 p-3 sm:p-4',
			bentoGridClass:
				'grid auto-rows-[20rem] grid-cols-1 md:grid-cols-2 gap-4 w-full',
			sidebarClass:
				'w-56 md:w-64 flex-shrink-0 p-3 sm:p-4 border-r border-gray-200 dark:border-gray-700',
		}
	} else {
		return {
			showSidebar: true,
			showRightPanel: true,
			containerClass: 'flex w-full max-w-full overflow-x-hidden',
			mainClass: 'flex-1 min-w-0 p-4',
			bentoGridClass:
				'grid auto-rows-[22rem] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:grid-rows-3 w-full',
			sidebarClass: 'w-60 lg:w-70 flex-shrink-0 p-4',
			rightPanelClass: 'w-80 xl:w-96 flex-shrink-0 p-3',
		}
	}
})

// 响应式卡片配置 - 使用shallowRef优化性能
const cardConfig = computed(() => {
	if (isMobile.value) {
		return {
			width: 'w-full max-w-full',
			textClass: 'text-sm sm:text-base',
			titleClass: 'text-xl sm:text-2xl',
		}
	} else if (isTablet.value) {
		return {
			width: 'w-full max-w-full',
			textClass: 'text-base md:text-lg',
			titleClass: 'text-2xl md:text-3xl',
		}
	} else {
		return {
			width: 'w-full max-w-sm lg:max-w-md',
			textClass: 'text-lg xl:text-xl',
			titleClass: 'text-2xl xl:text-3xl',
		}
	}
})

// 性能优化：避免不必要的组件重渲染
const shouldRenderRightPanel = computed(() => layoutConfig.value.showRightPanel)
const shouldRenderSidebar = computed(() => layoutConfig.value.showSidebar)
import CardSpotlight from '~/components/inspira/card/CardSpotlight.vue'
import BentoGrid from '~/components/inspira/miscellaneous/BentoGrid/BentoGrid.vue'
import BentoGridCard from '~/components/inspira/miscellaneous/BentoGrid/BentoGridCard.vue'
import BorderBeam from '~/components/inspira/special-effects/BorderBeam.vue'
// 懒加载重组件以优化性能
const Globe = defineAsyncComponent(
	() => import('~/components/inspira/miscellaneous/Globe.vue'),
)
const TextRevealCard = defineAsyncComponent(
	() => import('~/components/inspira/text/TextRevealCard.vue'),
)
const FlickeringGrid = defineAsyncComponent(
	() => import('~/components/inspira/background/FlickeringGrid.vue'),
)
import { ref, onMounted, h, defineComponent, defineAsyncComponent } from 'vue'

// 递归组件实现
const CustomTreeNode = defineComponent({
	name: 'CustomTreeNode',
	props: {
		node: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		return () => {
			const { node } = props

			if (node.type === 'file') {
				return h(File, {
					id: node.id,
					name: node.name,
				})
			}

			return h(
				Folder,
				{
					id: node.id,
					name: node.name,
				},
				// 递归渲染子节点
				() =>
					node.children?.map((child) =>
						h(CustomTreeNode, { node: child, key: child.id }),
					),
			)
		}
	},
})

const features = [
	{
		name: '为什么创建Virosa',
		description: '从一个更严肃的角度了解这篇博客的存在',
		href: '/article/113',
		image: 'picture/photo-gallery/Article1.png',
		cta: 'Learn more',
		class: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
	},
	{
		name: '编程语言中的艺术',
		description: '在体验过由C/C++转码Java之后，越发想要体验Java转码C/C++的感受',
		href: '/article/117',
		image: 'picture/photo-gallery/Article4.png',
		cta: 'Learn more',
		class: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
	},
	{
		name: '拖延症',
		description: '拖延症？一个老生常谈的话题，有什么可说的？',
		href: '/article/115',
		cta: 'Learn more',
		class: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
	},
	{
		name: '我是I人',
		description: 'I人进来找共鸣，E人进来认识I人的内心世界',
		href: '/article/116',
		cta: 'Learn more',
		class: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
	},
	{
		name: '梦与酒',
		description: '或许我也到了爱做梦的年纪',
		href: '/article/114',
		image: 'picture/photo-gallery/Article3.png',
		cta: 'Learn more',
		class: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
	},
]

// 初始化为一个数组，符合Tree组件期望的格式
const elements = ref([])

// 处理并转换节点数据，使其符合组件要求
function processNodeData(data) {
	if (!data) return null

	// 创建一个新的节点对象
	const processedNode = {
		id: data.id.toString(),
		name: data.name,
		// 确保类型映射正确：API返回"directory"，TreeNode组件需要"folder"或"file"
		type: data.type === 'directory' ? 'folder' : data.type,
	}

	// 如果节点有文章ID，添加属性
	if (data.articleId) {
		processedNode.articleId = data.articleId.toString()
		// 可以添加链接属性，方便点击跳转
		processedNode.href = `/article/${data.articleId}`
	}

	// 递归处理子节点
	if (
		data.children &&
		Array.isArray(data.children) &&
		data.children.length > 0
	) {
		processedNode.children = data.children.map((child) =>
			processNodeData(child),
		)
	} else {
		// 确保children是数组或undefined，不是null
		processedNode.children = data.type === 'directory' ? [] : undefined
	}

	return processedNode
}

// 直接使用模拟数据进行测试
const mockData = {
	id: 1,
	name: 'root',
	type: 'directory',
	parentId: 0,
	status: 1,
	createTime: '2025-06-18T09:18:24',
	updateTime: '2025-06-18T09:18:24',
	children: [
		{
			id: 3,
			name: '随笔',
			type: 'directory',
			parentId: 1,
			status: 1,
			createTime: '2025-06-19T10:50:08',
			updateTime: '2025-06-19T10:50:08',
			children: [
				{
					id: 15,
					name: 'React 性能优化指南',
					type: 'file',
					parentId: 3,
					articleId: 1003,
					status: 1,
					createTime: '2025-06-19T11:13:41',
					updateTime: '2025-06-19T11:13:41',
				},
			],
		},
		{
			id: 4,
			name: '技术',
			type: 'directory',
			parentId: 1,
			status: 1,
			createTime: '2025-06-19T10:50:08',
			updateTime: '2025-06-19T10:50:08',
			children: [
				{
					id: 13,
					name: 'Java NIO 原理解析',
					type: 'file',
					parentId: 4,
					articleId: 1001,
					status: 1,
					createTime: '2025-06-19T11:13:41',
					updateTime: '2025-06-19T11:13:41',
				},
			],
		},
	],
}

onMounted(() => {
	// 首先应用模拟数据，确保界面正常显示
	const processedMockData = processNodeData(mockData)
	console.log('处理后的模拟数据:', processedMockData)
	// 将处理后的数据放入数组中，符合Tree组件的期望
	elements.value = [processedMockData]

	// 然后尝试从API获取真实数据
	fetchFileTree()
})

// 从API获取文件树数据
async function fetchFileTree() {
	try {
		console.log('开始获取文件树数据...')
		console.log('API请求URL:', '/nodes/tree') // 记录正确的请求URL
		const res = await NodeService.getFileTree()
		console.log('API返回的原始数据:', res)

		if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
			// 处理第一个根节点数据
			const rootNode = res.data[0]
			const processedData = processNodeData(rootNode)

			console.log('处理后的文件树数据:', processedData)
			// 将处理后的数据放入数组中，符合Tree组件的期望
			elements.value = [processedData]
		} else {
			console.error('获取文件树失败: 返回数据不符合预期', res)
			// 已经有模拟数据，不需要再设置默认节点
		}
	} catch (error) {
		console.error('获取文件树失败:', error)
		console.error('错误详情:', error.response || error.message || error)
		// 已经有模拟数据，不需要再设置默认节点
	}
}
</script>

<template>
	<div class="max-w-full min-h-screen w-full overflow-x-hidden">
		<div
			:class="[
				layoutConfig.containerClass,
				'max-w-7xl xl:max-w-screen-2xl mx-auto',
			]"
		>
			<!-- 移动端顶部文件树 -->
			<aside
				v-if="isMobile && !layoutConfig.showSidebar"
				:class="layoutConfig.sidebarClass"
			>
				<div class="relative flex flex-col items-center justify-center">
					<CardSpotlight
						:class="[
							'h-fit flex-col cursor-pointer whitespace-nowrap border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black',
							cardConfig.width,
						]"
						:gradient-color="isDark ? '#363636' : '#C9C9C9'"
					>
						<Tree
							class="overflow-hidden rounded-md"
							:initial-selected-id="'1'"
							:initial-expanded-items="[]"
							:elements="elements"
						>
							<template v-for="node in elements" :key="node.id">
								<CustomTreeNode :node="node" />
							</template>
						</Tree>
					</CardSpotlight>
				</div>
			</aside>

			<!-- 左侧边栏 - 平板和桌面端 -->
			<aside v-if="shouldRenderSidebar" :class="layoutConfig.sidebarClass">
				<div class="relative flex flex-col items-center justify-center">
					<CardSpotlight
						:class="[
							'h-fit flex-col cursor-pointer whitespace-nowrap border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black',
							cardConfig.width,
						]"
						:gradient-color="isDark ? '#363636' : '#C9C9C9'"
					>
						<Tree
							class="overflow-hidden rounded-md"
							:initial-selected-id="'1'"
							:initial-expanded-items="[]"
							:elements="elements"
						>
							<template v-for="node in elements" :key="node.id">
								<CustomTreeNode :node="node" />
							</template>
						</Tree>
					</CardSpotlight>
				</div>
			</aside>

			<!-- 主内容区 - 响应式显示 -->
			<main :class="[layoutConfig.mainClass, 'flex flex-col gap-2']">
				<BentoGrid
					:class="['bento-grid w-full max-w-full', layoutConfig.bentoGridClass]"
				>
					<BentoGridCard
						v-for="(feature, index) in features"
						:key="index"
						v-bind="feature"
						:class="[
							// 桌面端使用预设的grid位置类，移动端和平板端忽略
							isDesktop ? feature.class : '',
						]"
					>
						<template v-if="feature.image" #background>
							<div
								class="absolute inset-0 size-full bg-cover bg-center opacity-60 transition duration-150 ease-in-out group-hover:opacity-20"
								:style="`background-image: url('${feature.image}')`"
							></div>
						</template>
					</BentoGridCard>
				</BentoGrid>

				<!-- 桌面端和平板端显示长文字卡片 -->
				<div
					v-if="!isMobile"
					class="bg-background relative z-10 mt-6 h-fit w-full flex flex-col items-center justify-center overflow-hidden border border-black/[0.1] rounded-lg bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black"
				>
					<div :class="isDark ? 'dark' : ''">
						<div class="text-center">
							<h1
								:class="[
									'font-bold text-purple-400 dark:text-purple-300',
									cardConfig.titleClass,
								]"
							>
								阅读激励实验 · 交互站点
							</h1>
							<p
								:class="[
									'mt-4 text-gray-800 dark:text-gray-300',
									cardConfig.textClass,
								]"
							>
								📖 你正接近一片未标记的文本领域 ——
								此处的字句尚未被完全解读，它们仍在寻找宿主。
							</p>
						</div>

						<div class="mt-8">
							<h2
								:class="[
									'font-semibold text-blue-300 dark:text-blue-400',
									isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl',
								]"
							>
								🜲 阅读探险者协议
							</h2>
							<p
								:class="[
									'mt-4 text-gray-800 dark:text-gray-300',
									isMobile ? 'text-sm' : 'text-base',
								]"
							>
								「欢迎加入这场文字远征，进入前请确认装备：」
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>信息耐受力 —— 防止被过量思考淹没</li>
								<li>逻辑弹性装置 —— 应对突如其来的意义偏折</li>
								<li>幽默感缓冲层 —— 用于吸收文本中的高能隐喻</li>
							</ul>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								⚠ 注意：阅读过程中，可能触发以下状态变换
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>突然对某个旧概念产生全新理解</li>
								<li>误入作者未设防的思维巷道</li>
								<li>发现一行文字比你先看穿了自己</li>
							</ul>
						</div>

						<div class="mt-8">
							<h2
								class="text-2xl text-blue-300 font-semibold dark:text-blue-400"
							>
								🜲 交互式阅读咒语
							</h2>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>点击 = 点燃文字火种</li>
								<li>滚轮滑动 = 进入节奏共振</li>
								<li>按下 Ctrl+S = 存档你的顿悟瞬间</li>
							</ul>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								🪐 每个段落都是可能性的折叠点，它们可以是指引，也可以是岔路。
							</p>
						</div>

						<div class="mt-8">
							<h2
								class="text-2xl text-blue-300 font-semibold dark:text-blue-400"
							>
								🜲 认知拓展彩蛋
							</h2>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								当你的视线抵达页面底部，你将解锁：
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>一份作者藏匿的"阅读副作用"清单</li>
								<li>某段被删改七次的自我辩解</li>
								<li>以及一个等待填充的 _______</li>
							</ul>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								📌 阅读不是单向吸收，而是一次创造，
								每个眼神的停留，都在重构这组字符的意义。
							</p>
						</div>

						<div class="mt-8">
							<h2 class="text-2xl text-red-300 font-semibold dark:text-red-400">
								🍫 阅读结算 · 可能性分布
							</h2>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								「此刻，你可以选择：」
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>🔹 [89%] 关闭页面，如合上一本异次元手册</li>
								<li>🔹 [9.7%] 在留言区投递一颗未解的思维子弹</li>
								<li>🔹 [1.3%] 在现实世界发现这段文字的回声</li>
							</ul>
						</div>

						<div class="mt-8 text-center">
							<p class="text-lg text-gray-800 font-semibold dark:text-gray-400">
								🌀
								无论选择哪条路径，愿这些字符在你的突触间生长出意料之外的神经连接。
							</p>
						</div>
					</div>

					<Suspense>
						<FlickeringGrid
							class="[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] absolute inset-0 -z-10"
							:square-size="4"
							:grid-gap="6"
							color="#60A5FA"
							:max-opacity="0.5"
							:flicker-chance="0.1"
							:width="1000"
							:height="800"
						/>
						<template #fallback>
							<div
								class="absolute inset-0 from-blue-50 to-blue-100 bg-gradient-to-br -z-10 dark:from-blue-950 dark:to-blue-900"
							></div>
						</template>
					</Suspense>
				</div>

				<!-- 移动端显示右侧卡片 -->
				<div v-if="isMobile" class="mt-4 max-w-full w-full px-1 space-y-4">
					<!-- TextRevealCard -->
					<div class="relative max-w-full w-full">
						<div
							class="relative w-full border border-black/[0.1] rounded-xl bg-gray-50 p-4 dark:border-white/[0.2] dark:bg-black"
						>
							<Suspense>
								<TextRevealCard class="mx-auto w-full">
									<template #header>
										<h2 class="mb-2 text-base text-white font-semibold">
											Rosy once said about 📖
										</h2>
									</template>
									<template #text>
										<p
											class="bg-[#d5d0d0] bg-clip-text py-2 text-sm text-transparent font-bold"
										>
											"翻开书页，灵魂便可徜徉千重世界；然逃避文字者，唯能踽踽独行一途。"
										</p>
									</template>
									<template #revealText>
										<p
											:style="{
												textShadow: '4px 4px 15px rgba(0,0,0,0.5)',
											}"
											class="from-white to-neutral-300 bg-gradient-to-b bg-clip-text py-2 text-sm text-white font-bold"
										>
											"Through the pages of a book, a soul may wander a thousand
											worlds; but he who shuns the written word walks but a
											single path."
										</p>
									</template>
								</TextRevealCard>
								<template #fallback>
									<div
										class="mx-auto max-w-full w-full animate-pulse rounded-lg from-gray-100 to-gray-200 bg-gradient-to-br p-3 dark:from-gray-800 dark:to-gray-900"
									>
										<div
											class="mb-2 h-3 rounded bg-gray-300 dark:bg-gray-600"
										></div>
										<div
											class="mb-1 h-2 rounded bg-gray-200 dark:bg-gray-700"
										></div>
										<div
											class="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-700"
										></div>
									</div>
								</template>
							</Suspense>
						</div>
						<BorderBeam :duration="7" :delay="12" :border-width="2" />
					</div>

					<!-- Globe Card -->
					<div class="relative max-w-full w-full">
						<div
							class="relative h-72 w-full overflow-hidden border border-black/[0.1] rounded-xl bg-gray-50 dark:border-white/[0.2] dark:bg-black"
						>
							<!-- Read 文字在正上方，离地球更近 -->
							<div
								class="absolute left-1/2 top-4 z-20 transform -translate-x-1/2"
							>
								<span
									class="pointer-events-none whitespace-pre-wrap from-black to-gray-300/80 bg-gradient-to-b bg-clip-text text-center text-7xl text-transparent font-bold leading-none dark:from-white dark:to-slate-900/10 md:text-9xl sm:text-8xl"
								>
									Read
								</span>
							</div>

							<!-- 地球容器 - 贴底部，一半在外面 -->
							<div
								class="absolute bottom-0 left-1/2 translate-y-1/2 transform -translate-x-1/2"
							>
								<Suspense>
									<div
										class="relative h-72 w-72 overflow-visible sm:h-80 sm:w-80"
									>
										<Globe
											class="globe-container !relative !inset-auto !h-full !max-w-none !w-full"
										/>
									</div>
									<template #fallback>
										<div
											class="h-72 w-72 animate-pulse rounded-full from-blue-200 to-purple-200 bg-gradient-to-br sm:h-80 sm:w-80 dark:from-blue-800 dark:to-purple-800"
										></div>
									</template>
								</Suspense>
							</div>

							<!-- 背景渐变 -->
							<div
								class="pointer-events-none absolute inset-0 h-full rounded-xl bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"
							/>
						</div>
						<BorderBeam :duration="12" :delay="17" :border-width="2" />
					</div>
				</div>
			</main>

			<!-- 右侧边栏 - 仅桌面端显示 -->
			<aside
				v-if="shouldRenderRightPanel"
				:class="layoutConfig.rightPanelClass"
			>
				<!-- TextRevealCard - 简化结构 -->
				<div class="relative max-w-full w-full">
					<div
						class="relative w-full border border-black/[0.1] rounded-xl bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black"
					>
						<Suspense>
							<TextRevealCard class="mx-auto w-full">
								<template #header>
									<h2 class="mb-3 text-lg text-white font-semibold xl:text-xl">
										Rosy once said about 📖
									</h2>
								</template>
								<template #text>
									<p
										class="bg-[#d5d0d0] bg-clip-text py-2 text-base text-transparent font-bold xl:text-lg"
									>
										"翻开书页，灵魂便可徜徉千重世界；然逃避文字者，唯能踽踽独行一途。"
									</p>
								</template>
								<template #revealText>
									<p
										:style="{
											textShadow: '4px 4px 15px rgba(0,0,0,0.5)',
										}"
										class="from-white to-neutral-300 bg-gradient-to-b bg-clip-text py-2 text-base text-white font-bold xl:text-lg"
									>
										"Through the pages of a book, a soul may wander a thousand
										worlds; but he who shuns the written word walks but a single
										path."
									</p>
								</template>
							</TextRevealCard>
							<template #fallback>
								<div
									class="mx-auto w-full animate-pulse rounded-lg from-gray-100 to-gray-200 bg-gradient-to-br p-4 dark:from-gray-800 dark:to-gray-900"
								>
									<div
										class="mb-3 h-5 rounded bg-gray-300 dark:bg-gray-600"
									></div>
									<div
										class="mb-2 h-4 rounded bg-gray-200 dark:bg-gray-700"
									></div>
									<div
										class="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"
									></div>
								</div>
							</template>
						</Suspense>
					</div>
					<BorderBeam :duration="7" :delay="12" :border-width="2" />
				</div>

				<!-- Globe Card - 简化结构 -->
				<div class="relative mt-6 max-w-full w-full">
					<div
						class="relative h-80 w-full overflow-hidden border border-black/[0.1] rounded-xl bg-gray-50 xl:h-96 dark:border-white/[0.2] dark:bg-black"
					>
						<!-- Read 文字在上方，地球后面 -->
						<div
							class="absolute left-1/2 top-0 z-10 transform -translate-x-1/2"
						>
							<span
								class="pointer-events-none whitespace-pre-wrap from-black to-gray-300/80 bg-gradient-to-b bg-clip-text text-center text-7xl text-transparent font-bold leading-none dark:from-white dark:to-slate-900/10 2xl:text-9xl xl:text-8xl"
							>
								Read
							</span>
						</div>

						<!-- 地球容器 - 贴底部，一半在外面，更大尺寸 -->
						<div
							class="absolute bottom-0 left-1/2 z-20 translate-y-1/2 transform -translate-x-1/2"
						>
							<Suspense>
								<div
									class="relative h-72 w-72 overflow-visible 2xl:h-96 2xl:w-96 xl:h-80 xl:w-80"
								>
									<Globe
										class="globe-container !relative !inset-auto !h-full !max-w-none !w-full"
									/>
								</div>
								<template #fallback>
									<div
										class="h-72 w-72 animate-pulse rounded-full from-blue-200 to-purple-200 bg-gradient-to-br 2xl:h-96 2xl:w-96 xl:h-80 xl:w-80 dark:from-blue-800 dark:to-purple-800"
									></div>
								</template>
							</Suspense>
						</div>

						<!-- 背景渐变 -->
						<div
							class="pointer-events-none absolute inset-0 z-0 h-full rounded-xl bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"
						/>
					</div>
					<BorderBeam :duration="12" :delay="17" :border-width="2" />
				</div>
			</aside>
		</div>
	</div>
</template>

<style scoped>
/* 防止页面溢出 */
* {
	box-sizing: border-box;
}

/* 整体页面控制 */
.min-h-screen {
	overflow-x: hidden;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

/* 确保卡片背景图片完全填充 */
:deep(.bento-grid-card) {
	position: relative;
	height: 100%;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	/* 移除默认阴影 */
	box-shadow: none !important;
}

:deep(.bento-grid-card [name='background'] > div) {
	background-size: cover !important;
	background-position: center !important;
	height: 100% !important;
	width: 100% !important;
	max-width: 100% !important;
	position: absolute;
	inset: 0;
}

/* 响应式网格布局 */
:deep(.bento-grid) {
	display: grid;
	gap: 1rem;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
}

/* 确保卡片内容正确显示 */
:deep(.bento-grid-card h3) {
	position: relative;
	z-index: 2;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

:deep(.bento-grid-card p) {
	position: relative;
	z-index: 2;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

/* 右侧边栏卡片优化 */
aside:last-child .relative {
	width: 100% !important;
	max-width: 100% !important;
}

/* Globe组件修复 */
:deep(.globe-container) {
	position: relative !important;
	inset: auto !important;
	width: 100% !important;
	height: 100% !important;
	max-width: none !important;
}

:deep(.globe-container canvas) {
	position: relative !important;
	width: 100% !important;
	height: 100% !important;
}

/* BorderBeam 圆角修复 */
:deep(.border-beam) {
	border-radius: 0.75rem !important; /* rounded-xl */
}

:deep(.border-beam::before) {
	border-radius: 0.75rem !important;
}

:deep(.border-beam::after) {
	border-radius: 0.75rem !important;
}

/* 移动端卡片优化 */
@media (max-width: 640px) {
	/* Globe 卡片响应式调整 */
	.relative:has(.w-56) {
		margin-bottom: 0.5rem;
	}
}

/* 移动端优化 */
@media (max-width: 640px) {
	/* TextRevealCard 内部间距优化 */
	:deep(.text-reveal-card) {
		padding: 1rem !important;
		max-width: 100% !important;
	}

	/* BentoGrid 优化 */
	:deep(.bento-grid-card) {
		/* 移动端移除固定的grid位置类的影响 */
		grid-column: auto !important;
		grid-row: auto !important;
		width: 100% !important;
		max-width: 100% !important;
	}

	:deep(.bento-grid) {
		gap: 0.75rem;
	}
}

/* 平板端优化 */
@media (min-width: 641px) and (max-width: 1024px) {
	:deep(.bento-grid) {
		gap: 1rem;
	}

	:deep(.bento-grid-card) {
		min-width: 0;
		overflow: hidden;
	}
}

/* 超大屏幕优化 */
@media (min-width: 1920px) {
	:deep(.bento-grid) {
		max-width: 1400px;
		margin: 0 auto;
	}
}

/* 确保flex容器不溢出 */
aside,
main {
	min-width: 0;
	overflow: hidden;
}
</style>
