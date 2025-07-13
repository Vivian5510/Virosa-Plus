<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	Book,
	BookDescription,
	BookHeader,
	BookTitle,
} from '~/components/inspira/miscellaneous/Book'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const books = reactive([
	{
		title: '冰菓',
		description: '推理？青春、成长、斗争！',
		color: 'emerald',
		url: 'article/140',
	},
	{
		title: '挪威的森林',
		description: 'This one also animates!',
		color: 'violet',
		url: 'article/141',
	},
	{
		title: 'Pointers On C',
		description: 'More animation awaits!',
		color: 'pink',
		url: 'article/142',
	},
	{
		title: '永别了，武器',
		description: 'Hover me to animate!',
		color: 'lime',
		url: 'article/143',
	},
	{
		title: 'Effective Java',
		description: 'This one also animates!',
		color: 'rose',
		url: 'article/144',
	},
	{
		title: '被讨厌的勇气',
		description: '人生所有的痛苦，都源于你主动选择了痛苦。',
		color: 'fuchsia',
		url: 'article/145',
	},
	{
		title: '人性的弱点',
		description: 'This one also animates!',
		color: 'slate',
		url: 'article/146',
	},
	{
		title: '长日将尽',
		description: 'More animation awaits!',
		color: 'sky',
		url: 'article/147',
	},
])
</script>

<template>
	<section class="px-4 py-8 sm:py-12">
		<div class="mx-auto max-w-7xl flex flex-col items-center justify-center">
			<div class="mb-6 w-full text-center lg:mb-16 md:mb-12 sm:mb-10">
				<h1 class="relative z-20 text-black font-bold dark:text-white">
					<SparklesText
						text="Top in my Reading List"
						:colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
						:sparkles-count="10"
						class="my-4 text-xl lg:text-4xl md:text-3xl sm:text-2xl xl:text-5xl"
					/>
				</h1>
			</div>

			<div
				class="relative z-10 grid mt-4 w-full place-items-center p-4 md:mt-8 sm:mt-6 lg:p-8 md:p-6"
				:class="{
					'grid-cols-1 gap-12': true,
					'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': true,
					'sm:gap-10 md:gap-10 lg:gap-12': true,
				}"
			>
				<div
					v-for="(book, index) in books"
					:key="index"
					class="w-full flex transform justify-center transition-all duration-300 hover:scale-105"
				>
					<a :href="book.url" class="max-w-xs w-full">
						<Book
							:color="book.color ?? 'rose'"
							class="mx-auto"
						>
							<BookHeader>
								<FontAwesomeIcon :icon="['fas', 'book-open']" class="h-6 w-6" />
							</BookHeader>
							<BookTitle>
								<h1 class="font-medium">
									{{ book.title }}
								</h1>
							</BookTitle>
							<BookDescription class="text-[12px]">
								<p>{{ book.description }}</p>
							</BookDescription>
						</Book>
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
@media (max-width: 640px) {
	.grid {
		row-gap: 2rem;
	}
}
</style>
