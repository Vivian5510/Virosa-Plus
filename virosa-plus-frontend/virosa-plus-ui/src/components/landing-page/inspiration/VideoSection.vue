<script setup lang="ts">
import CardContainer from '~/components/inspira/card/3D-card/CardContainer.vue'
import CardItem from '~/components/inspira/card/3D-card/CardItem.vue'
import CardBody from '~/components/inspira/card/3D-card/CardBody.vue'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const cards = ref([
	{
		title: 'Make things float in air',
		description: 'Hover over this card to unleash the power of CSS perspective',
		image:
			'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
		link: 'https://rahulv.dev',
	},
	{
		title: 'Discover the Unknown',
		description: 'Step into a world of limitless possibilities',
		image:
			'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2560&auto=format&fit=crop',
		link: 'https://example.com',
	},
	{
		title: 'Unlock Your Potential',
		description: 'Push the boundaries of your creativity',
		image:
			'https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2560&auto=format&fit=crop',
		link: 'https://example.com',
	},
	{
		title: 'Make things float in air',
		description: 'Hover over this card to unleash the power of CSS perspective',
		image:
			'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
		link: 'https://rahulv.dev',
	},
	{
		title: 'Discover the Unknown',
		description: 'Step into a world of limitless possibilities',
		image:
			'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2560&auto=format&fit=crop',
		link: 'https://example.com',
	},
	{
		title: 'Unlock Your Potential',
		description: 'Push the boundaries of your creativity',
		image:
			'https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2560&auto=format&fit=crop',
		link: 'https://example.com',
	},
	{
		title: 'Make things float in air',
		description: 'Hover over this card to unleash the power of CSS perspective',
		image:
			'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
		link: 'https://rahulv.dev',
	},
	{
		title: 'Discover the Unknown',
		description: 'Step into a world of limitless possibilities',
		image:
			'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2560&auto=format&fit=crop',
		link: 'https://example.com',
	},
	{
		title: 'Unlock Your Potential',
		description: 'Push the boundaries of your creativity',
		image:
			'https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2560&auto=format&fit=crop',
		link: 'https://example.com',
	},
])
</script>

<template>
	<section id="video">
		<h1
			class="text-xl mt-36 relative z-20 text-center text-black font-bold lg:text-5xl md:text-3xl dark:text-white"
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
