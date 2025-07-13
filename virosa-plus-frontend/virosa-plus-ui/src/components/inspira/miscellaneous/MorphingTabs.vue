<template>
	<div
		v-if="props.tabs.length"
		:class="cn('relative flex items-center justify-center', props.class)"
		:style="{
			filter: useGooEffect ? 'url(#exclusionTabsGoo)' : 'none',
		}"
	>
		<div
			class="flex items-center rounded-full bg-gray-100 p-1 transition-all duration-300 dark:bg-gray-800"
			:class="{
				'gap-1': isCompact,
				'gap-2': !isCompact,
			}"
		>
			<button
				v-for="tab in props.tabs"
				:key="tab.path"
				type="button"
				:class="[
					'relative transition-all duration-300 ease-out rounded-full font-medium cursor-pointer',
					'hover:scale-105 focus:outline-none',
					'flex items-center gap-2',
					{
						'px-3 py-1.5 text-sm': isCompact,
						'px-4 py-2 text-base': !isCompact,
						'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm':
							activeTab === tab.name,
						'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white':
							activeTab !== tab.name,
					},
				]"
				:style="{
					margin: useGooEffect
						? `0 ${activeTab === tab.name ? props.margin : 0}px`
						: '0',
				}"
				@click="handleTabClick(tab)"
			>
				<!-- 在紧凑模式下显示图标 -->
				<span v-if="isCompact && tab.icon" class="text-lg">{{ tab.icon }}</span>
				<!-- 正常模式下显示文本 -->
				<span v-if="!isCompact || !tab.icon">
					{{ te(tab.name) ? t(tab.name) : tab.label || tab.name }}
				</span>
				<!-- 活动状态指示器 -->
				<span
					v-if="activeTab === tab.name"
					class="absolute left-1/2 h-1 w-1 transform rounded-full bg-blue-500 transition-all duration-300 -bottom-1 -translate-x-1/2"
				></span>
			</button>
		</div>

		<!-- SVG Goo Effect (仅在启用时显示) -->
		<div v-if="useGooEffect" class="pointer-events-none absolute w-full">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="h-0 w-0">
				<defs>
					<filter
						id="exclusionTabsGoo"
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
						color-interpolation-filters="sRGB"
					>
						<feGaussianBlur
							in="SourceGraphic"
							:stdDeviation="blurStdDeviation"
							result="blur"
						></feGaussianBlur>
						<feColorMatrix
							in="blur"
							type="matrix"
							values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 36 -12"
							result="goo"
						></feColorMatrix>
						<feComposite
							in="SourceGraphic"
							in2="goo"
							operator="atop"
						></feComposite>
					</filter>
				</defs>
			</svg>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import { computed } from 'vue'

interface Route {
	path: string
	name: string
	icon?: string
	label?: string
}

interface Props {
	tabs: Route[]
	activeTab: string
	margin?: number
	class?: string
	blurStdDeviation?: number
	compact?: boolean
	useGooEffect?: boolean
}

const { te, t } = useI18n()
const router = useRouter()

const props = withDefaults(defineProps<Props>(), {
	margin: 20,
	blurStdDeviation: 6,
	compact: false,
	useGooEffect: true,
})

const emit = defineEmits<{
	(e: 'update:activeTab', tab: string): void
}>()

// 响应式计算属性
const isCompact = computed(() => props.compact)

// 处理标签点击事件
const handleTabClick = (tab: Route) => {
	emit('update:activeTab', tab.name)
	router.push(tab.path)
}
</script>

<style></style>
