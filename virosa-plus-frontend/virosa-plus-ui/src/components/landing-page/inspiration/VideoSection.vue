<script setup lang="ts">
import CardContainer from '~/components/inspira/card/3D-card/CardContainer.vue'
import CardItem from '~/components/inspira/card/3D-card/CardItem.vue'
import CardBody from '~/components/inspira/card/3D-card/CardBody.vue'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const cards = ref([
	{
		title: '冰菓',
		description: '一部我看过上百遍的动漫，每看一次都会有新的收获和感悟',
		image: 'picture/photo-gallery/冰菓15.png',
		link: '/article/10',
	},
	{
		title: '紫罗兰永恒花园',
		description: '“机械手指书写血肉情书，战争废墟里打捞爱的语言学。”',
		image: 'picture/photo-gallery/紫罗兰永恒花园7.jpg',
		link: '/article/11',
	},
	{
		title: '葬送的芙莉莲',
		description:
			'“漫长岁月中，逝去之人未曾远去，行走的步伐，是思念与成长的见证。”',
		image: 'picture/photo-gallery/葬送的芙莉莲63.png',
		link: '/article/12',
	},
	{
		title: '漂流少年',
		description: '“在扭曲现实中迷失，少年少女们踏上寻找自我与归属的无尽漂流。”',
		image: 'picture/photo-gallery/漂流少年1.png',
		link: '/article/13',
	},
	{
		title: '教父系列',
		description: '“完美诠释了承担权利所需要的能力以及代价”',
		image: 'picture/photo-gallery/教父0.jpg',
		link: '/article/14',
	},
	{
		title: '绿皮书',
		description: '“一场跨越偏见的旅途”',
		image: 'picture/photo-gallery/绿皮书0.jpg',
		link: '/article/15',
	},
	{
		title: '奇蛋物语',
		description:
			'“少女们在梦与现实的裂隙中奔跑，以伤痕换取成长，以离别寻得新生。”',
		image: 'picture/photo-gallery/奇蛋物语0.png',
		link: '/article/16',
	},
	{
		title: 'Just Because!',
		description: '“青春的悸动，在错过与再见之间，悄然绽放最纯粹的情感。”',
		image: 'picture/photo-gallery/Just Because!0.png',
		link: '/article/17',
	},
	{
		title: 'CAROLE & TUESDAY',
		description:
			'“在音乐的星空下，两颗孤独的心找到了彼此，共同谱写梦想与希望的旋律。”',
		image: 'picture/photo-gallery/CAROLE & TUESDAY0.jpg',
		link: '/article/18',
	},
])
</script>

<template>
	<section id="video">
		<h1
			class="relative z-20 mt-36 text-center text-xl text-black font-bold lg:text-5xl md:text-3xl dark:text-white"
		>
			<SparklesText
				text="These are the moments I find worthy of lingering upon"
				:colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
				:sparkles-count="10"
				class="my-8"
			/>
		</h1>

		<div class="grid grid-cols-3 grid-rows-3 place-content-center p-10">
			<CardContainer v-for="(card, index) in cards" :key="index">
				<CardBody
					class="group/card relative size-auto border border-black/[0.1] rounded-xl bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
				>
					<CardItem
						:translate-z="50"
						class="text-xl text-neutral-600 font-bold dark:text-white"
					>
						{{ card.title }}
					</CardItem>
					<CardItem
						as="p"
						translate-z="60"
						class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
					>
						{{ card.description }}
					</CardItem>
					<CardItem
						:translate-z="100"
						:rotate-x="20"
						:rotate-z="-10"
						class="mt-4 w-full"
					>
						<img
							:src="card.image"
							height="1000"
							width="1000"
							class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
							alt="thumbnail"
						/>
					</CardItem>
					<div class="mt-20 flex items-center justify-between">
						<CardItem
							:translate-z="20"
							:translate-x="-40"
							as="a"
							:href="card.link"
							target="__blank"
							class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
						>
							Visit →
						</CardItem>
						<CardItem
							:translate-z="20"
							:translate-x="40"
							as="button"
							class="rounded-xl bg-black px-4 py-2 text-xs text-white font-bold dark:bg-white dark:text-black"
						>
							Get Started
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		</div>
	</section>
</template>

<style scoped></style>
