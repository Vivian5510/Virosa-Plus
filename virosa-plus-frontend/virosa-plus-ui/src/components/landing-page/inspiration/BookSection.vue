<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	Book,
	BookDescription,
	BookHeader,
	BookTitle,
} from '~/components/inspira/miscellaneous/Book'
import SparklesText from '~/components/inspira/text/SparklesText.vue'

const { width } = useWindowSize()

const titleText = computed(() => {
	if (width.value < 640) {
		return "My Reading List"
	} else {
		return "Top in my Reading List"
	}
})

const titleSize = computed(() => {
	if (width.value < 640) {
		return "text-lg"
	} else if (width.value < 768) {
		return "text-xl" 
	} else if (width.value < 1024) {
		return "text-2xl"
	} else {
		return "text-3xl"
	}
})

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
	<section class="py-8 sm:py-12 px-4">
		<div class="flex flex-col items-center justify-center max-w-7xl mx-auto">
			<div class="w-full text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
				<h1
					class="relative z-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold dark:text-white"
				>
					<div :class="titleSize">
						<SparklesText
							:text="titleText"
							:colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
							:sparkles-count="10"
							class="my-4 sm:my-6 md:my-8"
						/>
					</div>
				</h1>
			</div>

			<div
				class="relative z-10 grid w-full mt-4 sm:mt-6 md:mt-8 p-4 md:p-6 lg:p-8 place-items-center"
				:class="{
					'grid-cols-1 gap-8': true,
					'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': true,
					'sm:gap-6 md:gap-6 lg:gap-8': true
				}"
			>
				<div 
					v-for="(book, index) in books" 
					:key="index" 
					class="flex justify-center w-full transform transition-all duration-300 hover:scale-105"
				>
					<a :href="book.url" class="w-full max-w-xs">
						<Book :color="book.color ?? 'rose'" class="shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto">
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
