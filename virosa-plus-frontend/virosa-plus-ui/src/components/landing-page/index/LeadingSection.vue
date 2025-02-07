<script setup lang="ts">
import FlipCard from '~/components/inspira/card/FlipCard.vue'

const flipCards = [
	{
		title: 'Inspira UI',
		subtitle: 'What is Inspira UI?',
		description:
			'Inspira UI offers beautifully designed, reusable animation components and includes custom components developed by us and contributed by the community.',
		image:
			'https://images.unsplash.com/photo-1525373698358-041e3a460346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		rotate: 'y',
	},
	{
		title: 'Inspira UI',
		subtitle: 'What is Inspira UI?',
		description:
			'Inspira UI offers beautifully designed, reusable animation components and includes custom components developed by us and contributed by the community.',
		image:
			'https://images.unsplash.com/photo-1525373698358-041e3a460346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		rotate: 'x',
	},
	{
		title: 'Inspira UI',
		subtitle: 'What is Inspira UI?',
		description:
			'Inspira UI offers beautifully designed, reusable animation components and includes custom components developed by us and contributed by the community.',
		image:
			'https://images.unsplash.com/photo-1525373698358-041e3a460346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		rotate: 'x',
	},
	{
		title: 'Inspira UI',
		subtitle: 'What is Inspira UI?',
		description:
			'Inspira UI offers beautifully designed, reusable animation components and includes custom components developed by us and contributed by the community.',
		image:
			'https://images.unsplash.com/photo-1525373698358-041e3a460346?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
		rotate: 'y',
	},
]
</script>

<template>
	<section id="Leading" class="mb-50 max-w-7xl flex flex-col items-center justify-center">
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
