<script setup lang="ts">
import DirectionAwareHover from '~/components/inspira/card/DirectionAwareHover.vue'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const items = ref([
	{
		title: 'Beautiful Landscape',
		description: "Discover nature's wonders",
		imageUrl:
			'https://images.unsplash.com/photo-1728755833852-2c138c84cfb1?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		title: 'Urban Adventure',
		description: 'Explore the city lights',
		imageUrl:
			'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
	},
	{
		title: 'Culinary Delights',
		description: 'Savor exquisite flavors',
		imageUrl:
			'https://images.unsplash.com/photo-1664710476481-1213c456c56c?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		buttonText: 'View Recipe',
	},
	{
		title: 'Mountain Escape',
		description: 'Find peace in the highlands',
		imageUrl:
			'https://images.unsplash.com/photo-1518199266791-5375a83190e5?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
						image-url="https://images.unsplash.com/photo-1728755833852-2c138c84cfb1?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						class="border-primary border-2 border-gray-800 shadow-lg dark:border-gray-400"
					>
						<h2 class="text-xl font-semibold">{{ item.title }}</h2>
						<p class="mt-2">{{ item.description }}</p>
						<button
							v-if="item.buttonText"
							class="mt-4 rounded bg-white px-4 py-2 text-black"
						>
							{{ item.buttonText }}
						</button>
					</DirectionAwareHover>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
