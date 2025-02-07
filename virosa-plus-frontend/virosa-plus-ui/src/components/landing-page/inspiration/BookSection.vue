<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	Book,
	BookDescription,
	BookHeader,
	BookTitle,
} from '~/components/inspira/miscellaneous/Book'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const books = ref([
	{ title: '冰菓', description: '推理？青春、成长、斗争！', color: 'emerald' }, // Tomato
	{
		title: '挪威的森林',
		description: 'This one also animates!',
		color: 'violet',
	}, // SteelBlue
	{
		title: 'Pointers On C',
		description: 'More animation awaits!',
		color: 'pink',
	}, // LimeGreen
	{ title: '永别了，武器', description: 'Hover me to animate!', color: 'lime' },
	{
		title: 'Effective Java',
		description: 'This one also animates!',
		color: 'rose',
	},
	{
		title: '被讨厌的勇气',
		description: '人生所有的痛苦，都源于你主动选择了痛苦。',
		color: 'fuchsia',
	},
	{
		title: '人性的弱点',
		description: 'This one also animates!',
		color: 'slate',
	},
	{
		title: '长日将尽',
		description: 'More animation awaits!',
		color: 'sky',
	},
])
</script>

<template>
	<section id="book">
		<h1
			class="text-1xl relative z-20 text-center text-black font-bold lg:text-5xl md:text-3xl dark:text-white"
		>
			<SparklesText
				text="Top in my Reading List"
				:colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
				:sparkles-count="10"
				class="my-8"
			/>
		</h1>

		<div
			class="relative z-10 grid grid-cols-4 grid-rows-2 mt-20 h-[800px] w-400 place-content-center p-10"
		>
			<div v-for="(book, index) in books" :key="index">
				<Book :color="book.color ?? 'rose'">
					<BookHeader>
						<FontAwesomeIcon :icon="['fas', 'book-open']" class="h-6 w-6" />
					</BookHeader>
					<BookTitle>
						<h1>{{ book.title }}</h1>
					</BookTitle>
					<BookDescription class="text-[12px]">
						<p>{{ book.description }}</p>
					</BookDescription>
				</Book>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
