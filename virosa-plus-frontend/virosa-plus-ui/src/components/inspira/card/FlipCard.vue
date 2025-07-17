<template>
	<div :class="cn('group [perspective:1000px]', props.class)">
		<div
			:class="
				cn(
					'flip-card-inner relative h-full rounded-2xl [transform-style:preserve-3d]',
					rotation[0],
				)
			"
		>
			<!-- Front -->
			<div class="[backface-visibility:hidden] absolute size-full">
				<img
					:src="props.image"
					alt="image"
					class="size-full rounded-2xl object-cover shadow-2xl shadow-black/40"
				/>
				<div class="absolute bottom-4 left-4 text-gray-800 font-bold">
					{{ props.title }}
				</div>
			</div>

			<!-- Back -->
			<div
				:class="
					cn(
						'absolute h-full w-full rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-slate-200 [backface-visibility:hidden] overflow-hidden',
						rotation[1],
					)
				"
			>
				<!-- 装饰性背景图案 -->
				<div class="absolute inset-0 opacity-10">
					<div
						class="absolute right-4 top-4 h-20 w-20 border border-white/20 rounded-full"
					></div>
					<div
						class="absolute bottom-6 left-6 h-16 w-16 border border-white/15 rounded-full"
					></div>
					<div
						class="absolute left-1/2 top-1/2 h-0.5 w-24 rotate-45 transform bg-white/10 -translate-x-1/2 -translate-y-1/2"
					></div>
				</div>

				<div class="relative h-full flex flex-col justify-between">
					<!-- 头部内容 -->
					<div class="flex-shrink-0">
						<!-- 标签 -->
						<div class="mb-2">
							<span
								class="inline-block rounded-full bg-white/20 px-2 py-1 text-xs font-medium backdrop-blur-sm"
							>
								{{ props.category || 'Experience' }}
							</span>
						</div>

						<!-- 标题 -->
						<h1
							class="mb-2 text-lg text-white font-bold leading-tight lg:text-xl"
						>
							{{ props.subtitle }}
						</h1>

						<!-- 分割线 -->
						<div
							class="mb-3 h-0.5 w-10 from-white to-transparent bg-gradient-to-r lg:mb-4 lg:w-12"
						></div>
					</div>

					<!-- 中间内容 -->
					<div class="min-h-0 flex flex-1 flex-col justify-center">
						<p class="text-xs text-gray-100 leading-relaxed lg:text-sm">
							{{ props.description }}
						</p>

						<!-- 特性列表 -->
						<div
							v-if="props.features && props.features.length"
							class="mt-3 lg:mt-4 space-y-1.5 lg:space-y-2"
						>
							<div
								v-for="(feature, index) in props.features"
								:key="index"
								class="flex items-center text-xs text-gray-300"
							>
								<div
									class="mr-2 h-1 w-1 flex-shrink-0 rounded-full bg-white/60"
								></div>
								<span class="truncate">{{ feature }}</span>
							</div>
						</div>
					</div>

					<!-- 底部内容 -->
					<div class="flex-shrink-0 pt-3 lg:pt-4">
						<!-- 底部操作或装饰 -->
						<div class="flex items-center justify-between">
							<div class="truncate text-xs text-gray-400">
								{{ props.meta || 'Explore More' }}
							</div>
							<div class="flex space-x-1">
								<div
									class="h-1.5 w-1.5 rounded-full bg-white/40 lg:h-2 lg:w-2"
								></div>
								<div
									class="h-1.5 w-1.5 rounded-full bg-white/60 lg:h-2 lg:w-2"
								></div>
								<div
									class="h-1.5 w-1.5 rounded-full bg-white/40 lg:h-2 lg:w-2"
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface FlipCardProps {
	image: string
	title: string
	subtitle?: string
	description: string
	category?: string
	features?: string[]
	meta?: string
	rotate?: 'x' | 'y'
	class?: string
}

const props = withDefaults(defineProps<FlipCardProps>(), {
	rotate: 'y',
})
const rotationClass = {
	x: ['group-hover:[transform:rotateX(180deg)]', '[transform:rotateX(180deg)]'],
	y: ['group-hover:[transform:rotateY(180deg)]', '[transform:rotateY(180deg)]'],
}

const rotation = computed(() => rotationClass[props.rotate])
</script>

<style scoped>
/* 强制确保动画样式优先级，避免被其他样式覆盖 */
.flip-card-inner {
	transition: transform 0.7s ease-in-out !important;
	transform-style: preserve-3d !important;
}

/* 确保hover动画也有正确的持续时间 */
.group:hover .flip-card-inner {
	transition: transform 0.7s ease-in-out !important;
}
</style>
