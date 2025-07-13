<script setup lang="ts">
import Sparkles from '~/components/inspira/background/Sparkles.vue'
import { useResponsive } from '~/composables/useResponsive'

const mode = useColorMode()
const { isMobile, isTablet, isDesktop } = useResponsive()

const particlesColor = computed(() =>
	mode.value === 'dark' ? '#FFFFFF' : '#000000',
)

// 响应式配置
const responsiveConfig = computed(() => {
	if (isMobile.value) {
		return {
			containerHeight: 'h-[32rem]',
			titleSize: 'text-4xl',
			subtitleSize: 'text-lg',
			particleDensity: 800,
			sparklesSize: 'h-48',
			gradientInsetX: 'inset-x-6',
		}
	} else if (isTablet.value) {
		return {
			containerHeight: 'h-[36rem]',
			titleSize: 'text-5xl',
			subtitleSize: 'text-2xl',
			particleDensity: 1000,
			sparklesSize: 'h-52',
			gradientInsetX: 'inset-x-12',
		}
	} else {
		return {
			containerHeight: 'h-[40rem]',
			titleSize: 'text-6xl xl:text-7xl',
			subtitleSize: 'text-3xl xl:text-4xl',
			particleDensity: 1200,
			sparklesSize: 'h-60',
			gradientInsetX: 'inset-x-20',
		}
	}
})
</script>

<template>
	<section class="mx-auto max-w-7xl w-full px-4 lg:px-8 sm:px-6">
		<div
			:class="[
				'w-full flex flex-col items-center justify-center overflow-hidden rounded-md',
				responsiveConfig.containerHeight,
			]"
		>
			<!-- 主标题 -->
			<div
				:class="[
					'relative z-20 text-center text-black font-bold dark:text-white mb-4',
					responsiveConfig.titleSize,
				]"
			>
				This place
			</div>

			<!-- 副标题 -->
			<h1
				:class="[
					'relative z-20 text-center text-black font-bold dark:text-white mb-8',
					responsiveConfig.subtitleSize,
				]"
			>
				For those who have sparked my spirit
			</h1>

			<!-- 装饰效果区域 -->
			<div
				:class="[
					'relative w-full max-w-4xl mx-auto',
					responsiveConfig.sparklesSize,
				]"
			>
				<!-- 渐变线条 - 长线 -->
				<div
					:class="[
						'absolute top-0 h-[2px] w-3/4 from-transparent via-indigo-500 to-transparent bg-gradient-to-r blur-sm',
						responsiveConfig.gradientInsetX,
					]"
				/>
				<div
					:class="[
						'absolute top-0 h-px w-3/4 from-transparent via-indigo-500 to-transparent bg-gradient-to-r',
						responsiveConfig.gradientInsetX,
					]"
				/>

				<!-- 渐变线条 - 短线 -->
				<div
					class="absolute inset-x-20 top-0 h-[5px] w-1/4 from-transparent via-sky-500 to-transparent bg-gradient-to-r blur-sm lg:inset-x-40 sm:inset-x-32 xl:inset-x-60"
				/>
				<div
					class="absolute inset-x-20 top-0 h-px w-1/4 from-transparent via-sky-500 to-transparent bg-gradient-to-r lg:inset-x-40 sm:inset-x-32 xl:inset-x-60"
				/>

				<!-- 星光粒子效果 -->
				<Suspense>
					<Sparkles
						background="transparent"
						:min-size="isMobile ? 0.3 : 0.4"
						:max-size="isMobile ? 1.2 : 1.4"
						:particle-density="responsiveConfig.particleDensity"
						class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] size-full"
						:particle-color="particlesColor"
					/>
					<template #fallback>
						<div
							class="size-full animate-pulse from-transparent via-blue-200 to-transparent bg-gradient-to-r dark:via-blue-800"
						></div>
					</template>
				</Suspense>

				<!-- 遮罩渐变 -->
				<div
					class="[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] absolute inset-0 size-full"
				></div>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
