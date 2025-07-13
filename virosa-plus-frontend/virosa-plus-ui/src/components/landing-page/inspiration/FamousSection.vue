<script setup lang="ts">
import { ref } from 'vue'
import DirectionAwareHover from '~/components/inspira/card/DirectionAwareHover.vue'
import SparklesText from '~/components/inspira/text/SparklesText.vue'
import { useResponsive } from '~/composables/useResponsive'

const { isMobile, isTablet, isDesktop } = useResponsive()

const items = ref([
	{
		title: 'Faker',
		description: '"代表着对极致的追求和对不断超越自我挑战的精神。"',
		imageUrl: 'picture/photo-gallery/Faker.png',
		href: 'article/136',
		buttonText: 'Learn More',
	},
	{
		title: '列宁',
		description: '"专制政权的奠基者，无产阶级的捍卫者。"',
		imageUrl: 'picture/photo-gallery/列宁1.jpg',
		href: 'article/137',
		buttonText: 'Learn More',
	},
	{
		title: '尼采',
		description: '"凝视深渊者。"',
		imageUrl: 'picture/photo-gallery/尼采.jpg',
		href: 'article/138',
		buttonText: 'Learn More',
	},
	{
		title: '苏格拉底',
		description: '"以诘问为剑。"',
		imageUrl: 'picture/photo-gallery/苏格拉底之死.jpg',
		href: 'article/139',
		buttonText: 'Learn More',
	},
])

// 响应式配置 - 保持原始贴合布局
const responsiveConfig = computed(() => {
	if (isMobile.value) {
		return {
			titleMarginTop: 'mt-20',
			gridMarginTop: 'mt-6',
			gridClass: 'grid-cols-1',
			cardClass: 'mx-auto w-full max-w-sm',
		}
	} else {
		return {
			titleMarginTop: 'mt-36',
			gridMarginTop: 'mt-8 lg:mt-20 md:mt-16 sm:mt-12',
			gridClass: 'grid-cols-2',
			cardClass: 'w-full',
		}
	}
})
</script>

<template>
	<section>
		<div>
			<div class="flex flex-col items-center justify-center">
				<h1
					:class="[
						'relative z-20 text-center text-black font-bold dark:text-white',
						responsiveConfig.titleMarginTop,
					]"
				>
					<SparklesText
						text="Draw inspiration from these great minds"
						:colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
						:sparkles-count="10"
						class="my-4 text-xl lg:text-4xl md:text-3xl sm:text-2xl xl:text-5xl"
					/>
				</h1>

				<div :class="['grid grid-cols-2', responsiveConfig.gridMarginTop]">
					<DirectionAwareHover
						v-for="(item, index) in items"
						:key="index"
						:image-url="item.imageUrl"
						class="border-primary border-2 border-gray-800 dark:border-gray-400"
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
