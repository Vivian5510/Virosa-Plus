<script setup lang="ts">
import { computed } from 'vue'
import { useResponsive } from '~/composables/useResponsive'
import FlipCard from '~/components/inspira/card/FlipCard.vue'

// 使用统一的响应式管理
const { isMobile, isTablet, isDesktop } = useResponsive()

// 控制组件显示隐藏
const shouldShow = computed(() => !isMobile.value)

// 响应式标题大小
const titleClasses = computed(() => {
	if (isMobile.value) {
		return 'text-3xl'
	} else if (isTablet.value) {
		return 'text-4xl'
	} else {
		return 'text-6xl'
	}
})

// 响应式容器样式
const containerClasses = computed(() => {
	if (isMobile.value) {
		return 'flex flex-col items-center justify-center gap-8'
	} else if (isTablet.value) {
		return 'grid grid-cols-2 gap-8 items-center justify-center'
	} else {
		return 'flex items-center justify-center gap-16'
	}
})

// 响应式显示的卡片数量
const visibleCards = computed(() => {
	if (isMobile.value) {
		return flipCards.slice(0, 2) // 移动端只显示2张
	} else if (isTablet.value) {
		return flipCards.slice(0, 4) // 平板端显示4张
	} else {
		return flipCards // 桌面端显示全部
	}
})

const flipCards = [
	{
		title: 'Whispers of Consciousness',
		subtitle: '思维宇宙的星轨',
		description: '穿梭意识荒原，捕捉灵光碎羽，在理性与感性的交界处聆听心弦共振',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		category: 'Mind Space',
		features: ['内观冥想', '意识流写作', '直觉感知'],
		meta: 'Since 2024',
		rotate: 'y',
	},
	{
		title: 'Vault of Ephemera',
		subtitle: '灵魂碎片的陈列室',
		description: '琥珀封存时光絮语，琉璃折射记忆棱角，每一帧都是生命诗篇的批注',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		category: 'Memory Archive',
		features: ['时光收集', '记忆编织', '情感标本'],
		meta: 'Always Growing',
		rotate: 'x',
	},
	{
		title: 'Aesthetic Pilgrimage',
		subtitle: '美学信仰的朝圣路',
		description: '在色彩经纬间编织世界观，让形态韵律化作信仰，构筑视觉的巴别塔',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		category: 'Visual Quest',
		features: ['色彩理论', '形态探索', '美学哲学'],
		meta: 'Art & Design',
		rotate: 'x',
	},
	{
		title: 'Serendipity Engine',
		subtitle: '灵光乍现的启示录',
		description:
			'当量子蝴蝶掠过认知的弦，某个平行宇宙的星光正在你的瞳孔里坍缩成诗',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		category: 'Inspiration Lab',
		features: ['偶然连结', '创意触发', '思维跃迁'],
		meta: 'Random Magic',
		rotate: 'y',
	},
]
</script>

<template>
	<section
		v-if="shouldShow"
		:class="[
			'w-full max-w-7xl flex flex-col items-center justify-center mx-auto',
			isMobile ? 'mb-20 px-4' : isTablet ? 'mb-32 px-6' : 'mb-50 px-8',
		]"
	>
		<!-- 响应式标题 -->
		<div
			:class="[
				'font-semibold text-center',
				titleClasses,
				isMobile ? 'mb-8' : 'mb-10',
			]"
		>
			What can you do here?
		</div>

		<!-- 响应式卡片布局 -->
		<div :class="containerClasses">
			<FlipCard
				v-for="(card, index) in visibleCards"
				:key="index"
				:title="card.title"
				:subtitle="card.subtitle"
				:description="card.description"
				:image="card.image"
				:category="card.category"
				:features="card.features"
				:meta="card.meta"
				:rotate="card.rotate"
				:class="[
					isMobile ? 'w-64 h-80' : isTablet ? 'w-48 h-64' : 'w-56 h-110',
				]"
			/>
		</div>

		<!-- 移动端提示 -->
		<div
			v-if="isMobile"
			class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
		>
			👆 Showing 2 of 4 cards • Switch to desktop for full experience
		</div>
	</section>
</template>

<style scoped></style>
