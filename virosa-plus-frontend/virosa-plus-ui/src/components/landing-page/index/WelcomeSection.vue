<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResponsive } from '~/composables/useResponsive'
import TextHighlight from '~/components/inspira/text/TextHighlight.vue'
import FlipWords from '~/components/inspira/text/FlipWords.vue'
import Lens from '~/components/inspira/miscellaneous/lens/Lens.vue'
import Rays from '~/components/inspira/miscellaneous/lens/Rays.vue'
import Beams from '~/components/inspira/miscellaneous/lens/Beams.vue'

// 使用统一的响应式管理
const { isMobile, isTablet, isDesktop, windowWidth } = useResponsive()

// 响应式容器高度计算
const containerHeight = computed(() => {
	if (isMobile.value) {
		return 'h-[20rem]' // 移动端较小
	} else if (isTablet.value) {
		return 'h-[25rem]' // 平板端中等
	} else {
		return 'h-[30rem]' // 桌面端较大
	}
})

// 响应式外层容器高度
const sectionHeight = computed(() => {
	if (isMobile.value) {
		return 'h-[30rem]' // 移动端
	} else if (isTablet.value) {
		return 'h-[40rem]' // 平板端
	} else {
		return 'h-[50rem]' // 桌面端
	}
})

// 响应式文字大小类
const mainTitleClasses = computed(() => {
	if (isMobile.value) {
		return 'text-2xl'
	} else if (isTablet.value) {
		return 'text-3xl'
	} else {
		return 'text-4xl'
	}
})

const bigTitleClasses = computed(() => {
	if (isMobile.value) {
		return 'text-3xl'
	} else if (isTablet.value) {
		return 'text-4xl'
	} else {
		return 'text-6xl'
	}
})

// 响应式内边距
const highlightPadding = computed(() => {
	if (isMobile.value) {
		return 'px-1 py-0.5'
	} else if (isTablet.value) {
		return 'px-2 py-1'
	} else {
		return 'px-4 py-1'
	}
})

// Lens组件状态管理
const hovering = ref(false)

function setHovering(value: boolean) {
	hovering.value = value
}
</script>

<template>
	<section
		class="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-16 sm:px-6 sm:py-12"
	>
		<div class="flex flex-col overflow-hidden">
			<!-- 响应式容器 -->
			<div
				:class="['relative flex items-center justify-center', sectionHeight]"
				:style="{ perspective: '1000px' }"
			>
				<div
					:class="[
						'relative w-full',
						isMobile ? 'py-6' : isTablet ? 'py-12 w-5/6' : 'py-20 w-3/4',
					]"
				>
					<!-- 响应式标题区 -->
					<div 
						:class="['text-center transition-all duration-300', isMobile ? 'mb-6' : 'mb-8']"
						:style="{ filter: hovering ? 'blur(2px)' : 'blur(0px)' }"
					>
						<h1
							:class="[
								'mx-auto max-w-4xl font-semibold text-black dark:text-white',
								mainTitleClasses,
							]"
						>
							"Welcome, wanderer, to Virosa's light,<span
								:class="{ hidden: isMobile }"
							>
								Where inspira awaken and dreams take flight.</span
							>" <br />
							<span
								:class="['mt-1 block font-bold leading-none', bigTitleClasses]"
							>
								This's
								<TextHighlight
									:class="[
										'rounded-xl from-pink-500 to-violet-500 bg-gradient-to-r',
										highlightPadding,
									]"
									text-end-color="hsl(var(--accent))"
								>
									<FlipWords :words="[' rosy ', 'virosa']" :duration="3000" />
								</TextHighlight>
								<span class="ml-1 inline-block translate-y-1 transform"
									>👋</span
								>
							</span>
						</h1>
					</div>

					<!-- 响应式设备展示区 -->
					<div
						:class="[
							'relative mx-auto w-full border-4 border-[#6C6C6C] rounded-[30px] bg-[#222222] overflow-hidden',
							containerHeight,
							isMobile ? 'p-2' : isTablet ? 'p-4' : 'p-6',
						]"
					>
						<!-- 背景特效 - 限制在容器内 -->
						<div class="absolute inset-0 overflow-hidden rounded-2xl">
							<Rays class="scale-75 opacity-60" />
							<Beams class="scale-75 opacity-60" />
						</div>
						
						<!-- 带Lens效果的图片 -->
						<div class="relative z-10 size-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
							<Lens
								:hovering="hovering"
								@hover-update="setHovering"
								class="!rounded-2xl"
							>
								<img
									src="/picture/miscellaneous/photo-vision-pro.avif"
									class="h-full w-full object-cover"
									alt="Apple Vision Pro"
									loading="lazy"
								/>
							</Lens>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
@media (max-width: 640px) {
	h1 {
		line-height: 1.3;
	}
}
</style>
