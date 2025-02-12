<script setup lang="ts">
import FlipCard from '~/components/inspira/card/FlipCard.vue'

const flipCards = [
	{
		title: 'Whispers of Consciousness',
		subtitle: '思维宇宙的星轨',
		description: '穿梭意识荒原，捕捉灵光碎羽，在理性与感性的交界处聆听心弦共振',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		rotate: 'y',
	},
	{
		title: 'Vault of Ephemera',
		subtitle: '灵魂碎片的陈列室',
		description: '琥珀封存时光絮语，琉璃折射记忆棱角，每一帧都是生命诗篇的批注',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		rotate: 'x',
	},
	{
		title: 'Aesthetic Pilgrimage',
		subtitle: '美学信仰的朝圣路',
		description: '在色彩经纬间编织世界观，让形态韵律化作信仰，构筑视觉的巴别塔',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		rotate: 'x',
	},
	{
		title: 'Serendipity Engine',
		subtitle: '灵光乍现的启示录',
		description:
			'当量子蝴蝶掠过认知的弦，某个平行宇宙的星光正在你的瞳孔里坍缩成诗',
		image: 'picture/photo-gallery/塔罗牌-BLANK.jpg',
		rotate: 'y',
	},
]
</script>

<template>
	<section
		class="mb-50 max-w-7xl flex flex-col items-center justify-center"
	>
		<div class="mb-10 text-6xl font-semibold">What can you do here?</div>

		<div class="flex items-center justify-center gap-16">
			<FlipCard
				v-for="(card, index) in flipCards"
				:key="index"
				:title="card.title"
				:subtitle="card.subtitle"
				:description="card.description"
				:image="card.image"
				:rotate="card.rotate"
			/>
		</div>
	</section>
</template>

<style scoped></style>
