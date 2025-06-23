<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ContainerScroll from '~/components/inspira/container-scroll/ContainerScroll.vue'
import TextHighlight from '~/components/inspira/text/TextHighlight.vue'
import FlipWords from '~/components/inspira/text/FlipWords.vue'

// 控制容器的宽高比
const aspectRatio = ref('16/9')

// 检测设备宽度调整布局
onMounted(() => {
	const updateAspectRatio = () => {
		if (window.innerWidth < 640) {
			// 移动设备使用更紧凑的比例
			aspectRatio.value = '3/4'
		} else if (window.innerWidth < 1024) {
			// 平板设备
			aspectRatio.value = '4/3'
		} else {
			// 桌面设备保持原比例
			aspectRatio.value = '16/9'
		}
	}

	updateAspectRatio()
	window.addEventListener('resize', updateAspectRatio)

	onUnmounted(() => {
		window.removeEventListener('resize', updateAspectRatio)
	})
})
</script>

<template>
	<section
		class="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-16 sm:px-6 sm:py-12"
	>
		<div class="flex flex-col overflow-hidden">
			<!-- 自定义ContainerScroll尺寸 -->
			<div
				class="relative h-[30rem] flex items-center justify-center md:h-[50rem] sm:h-[40rem]"
				:style="{ perspective: '1000px' }"
			>
				<div class="relative w-full py-10 md:w-3/4 md:py-20">
					<div class="mb-8 text-center">
						<h1
							class="mx-auto max-w-4xl text-2xl text-black font-semibold md:text-4xl sm:text-3xl dark:text-white"
						>
							"Welcome, wanderer, to Virosa's light,<span
								class="hidden sm:inline"
							>
								Where inspira awaken and dreams take flight.</span
							>" <br />
							<span
								class="mt-1 block text-4xl font-bold leading-none md:text-[6rem] md:text-6xl sm:text-5xl"
							>
								This's
								<TextHighlight
									class="rounded-xl from-pink-500 to-violet-500 bg-gradient-to-r px-2 py-1 md:px-4 sm:px-3"
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
					<div
						class="mx-auto h-[20rem] w-full border-4 border-[#6C6C6C] rounded-[30px] bg-[#222222] p-2 md:h-[30rem] sm:h-[25rem] md:p-6"
					>
						<div
							class="size-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900"
						>
							<img
								src="/picture/miscellaneous/photo-vision-pro.avif"
								class="h-full w-full rounded-2xl object-cover"
								alt="hero"
								loading="lazy"
							/>
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
