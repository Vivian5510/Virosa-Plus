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

// 响应式配置 - 保持原始贴合布局且优化视觉效果
const responsiveConfig = computed(() => {
	if (isMobile.value) {
		return {
			titleMarginTop: 'mt-20',
			gridMarginTop: 'mt-8',
			containerClass: 'max-w-sm mx-auto',
			gridClass: 'grid-cols-1',
			shadowStyle:
				'filter: drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.05))',
		}
	} else {
		return {
			titleMarginTop: 'mt-36',
			gridMarginTop: 'mt-8 lg:mt-20 md:mt-16 sm:mt-12',
			containerClass: 'max-w-4xl mx-auto',
			gridClass: 'grid-cols-2',
			shadowStyle:
				'filter: drop-shadow(0 20px 25px rgb(0 0 0 / 0.15)) drop-shadow(0 8px 10px rgb(0 0 0 / 0.1))',
		}
	}
})
</script>

<template>
	<section class="relative">
		<div class="relative z-10">
			<div class="flex flex-col items-center justify-center px-4">
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

				<!-- 田字卡片容器 -->
				<div
					:class="[
						'relative',
						responsiveConfig.containerClass,
						responsiveConfig.gridMarginTop,
					]"
					:style="responsiveConfig.shadowStyle"
				>
					<!-- 外层装饰光晕 -->
					<div class="absolute -inset-2 bg-gradient-to-br from-slate-700/12 via-indigo-800/15 to-slate-600/10 rounded-2xl blur-sm dark:from-slate-400/35 dark:via-indigo-400/40 dark:to-slate-300/30"></div>

					<!-- 田字网格 -->
					<div
						:class="[
							'relative grid bg-gradient-to-br from-gray-100/50 to-gray-200/50 rounded-xl overflow-hidden backdrop-blur-sm dark:from-gray-800/50 dark:to-gray-900/50',
							responsiveConfig.gridClass,
						]"
					>
						<DirectionAwareHover
							v-for="(item, index) in items"
							:key="index"
							:image-url="item.imageUrl"
							:class="[
								'relative transition-all duration-300 ease-out',
								// 桌面端：精确控制每个卡片的边框，保持田字无缝拼接
								!isMobile.value && index === 0
									? 'border-r-[1px] border-b-[1px] border-gray-300/80 dark:border-gray-600/80'
									: '',
								!isMobile.value && index === 1
									? 'border-l-[1px] border-b-[1px] border-gray-300/80 dark:border-gray-600/80'
									: '',
								!isMobile.value && index === 2
									? 'border-r-[1px] border-t-[1px] border-gray-300/80 dark:border-gray-600/80'
									: '',
								!isMobile.value && index === 3
									? 'border-l-[1px] border-t-[1px] border-gray-300/80 dark:border-gray-600/80'
									: '',
								// 移动端：每个卡片独立边框
								isMobile.value
									? 'border border-gray-300/60 dark:border-gray-600/60 mb-1'
									: '',
								'hover:z-10',
							]"
						>
							<!-- 文字内容 - 直接显示在图片上 -->
							<h2 class="text-xl font-bold text-white drop-shadow-lg tracking-wide">
								{{ item.title }}
							</h2>
							<p class="mt-3 text-sm text-gray-100 leading-relaxed font-medium">
								{{ item.description }}
							</p>

							<!-- 简洁的按钮设计 -->
							<a
								v-if="item.buttonText"
								:href="item.href"
								class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-white mt-4"
							>
								<span>{{ item.buttonText }}</span>
								<svg
									class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</a>
						</DirectionAwareHover>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>

/* 确保田字布局的精确边框对齐 */
.grid > :deep(.group\/card) {
	border-radius: 0;
	overflow: hidden;
}

/* 第一张卡片 - 左上角圆角 */
.grid > :deep(.group\/card:nth-child(1)) {
	border-top-left-radius: 0.75rem;
}

/* 第二张卡片 - 右上角圆角 */
.grid > :deep(.group\/card:nth-child(2)) {
	border-top-right-radius: 0.75rem;
}

/* 第三张卡片 - 左下角圆角 */
.grid > :deep(.group\/card:nth-child(3)) {
	border-bottom-left-radius: 0.75rem;
}

/* 第四张卡片 - 右下角圆角 */
.grid > :deep(.group\/card:nth-child(4)) {
	border-bottom-right-radius: 0.75rem;
}

/* 确保文字在所有背景上都清晰可见 */
:deep(.group\/card h2),
:deep(.group\/card p) {
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 移动端优化 */
@media (max-width: 640px) {
	.grid > :deep(.group\/card) {
		border-radius: 0.75rem !important;
		margin-bottom: 0.25rem;
	}

	.grid > :deep(.group\/card:last-child) {
		margin-bottom: 0;
	}

	/* 移动端时每个卡片都有完整圆角 */
	.grid > :deep(.group\/card:nth-child(1)),
	.grid > :deep(.group\/card:nth-child(2)),
	.grid > :deep(.group\/card:nth-child(3)),
	.grid > :deep(.group\/card:nth-child(4)) {
		border-radius: 0.75rem !important;
	}

}
</style>
