<script setup lang="ts">
import DirectionAwareHover from '~/components/inspira/card/DirectionAwareHover.vue'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const items = ref([
	{
		title: '丘吉尔',
		description: '“坚定如铁，舌灿如花。”',
		imageUrl: 'picture/photo-gallery/丘吉尔.png',
		href: 'article/6',
		buttonText: 'Learn More',
	},
	{
		title: '特斯拉',
		description: '“真正的天才。”',
		imageUrl: 'picture/photo-gallery/特斯拉.jpg',
		href: 'article/7',
		buttonText: 'Learn More',
	},
	{
		title: '尼采',
		description: '“凝视深渊者。”',
		imageUrl: 'picture/photo-gallery/尼采.jpg',
		href: 'article/8',
		buttonText: 'Learn More',
	},
	{
		title: '苏格拉底',
		description: '“诘问为剑。”',
		imageUrl: 'public/picture/photo-gallery/苏格拉底之死.jpg',
		href: 'article/9',
		buttonText: 'Learn More',
	},
])
</script>

<template>
	<section id="famous">
		<div>
			<div class="flex flex-col items-center justify-center">
				<h1
					class="relative z-20 mt-36 text-center text-xl text-black font-bold lg:text-5xl md:text-3xl dark:text-white"
				>
					<SparklesText
						text="Draw inspiration from these great minds"
						:colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
						:sparkles-count="10"
						class="my-8"
					/>
				</h1>

				<div class="grid grid-cols-2 mt-20">
					<DirectionAwareHover
						v-for="(item, index) in items"
						:key="index"
						:image-url="item.imageUrl"
						class="border-primary border-2 border-gray-800 shadow-lg dark:border-gray-400"
					>
						<h2 class="text-xl font-semibold">{{ item.title }}</h2>
						<p class="mt-2">{{ item.description }}</p>
						<button
							v-if="item.buttonText"
							class="pointer-events-auto mt-4 rounded bg-white px-4 py-2 text-black"
						>
							<a :href="item.href" class="text-[12px]">
								{{ item.buttonText }} →
							</a>
						</button>
					</DirectionAwareHover>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
