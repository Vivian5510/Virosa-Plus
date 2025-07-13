<template>
	<div :class="cn('group [perspective:1000px]', props.class)">
		<div
			:class="
				cn(
					'relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]',
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
					<div class="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"></div>
					<div class="absolute bottom-6 left-6 w-16 h-16 border border-white/15 rounded-full"></div>
					<div class="absolute top-1/2 left-1/2 w-24 h-0.5 bg-white/10 rotate-45 transform -translate-x-1/2 -translate-y-1/2"></div>
				</div>
				
				<div class="relative h-full flex flex-col justify-between">
					<!-- 头部内容 -->
					<div class="flex-shrink-0">
						<!-- 标签 -->
						<div class="mb-2">
							<span class="inline-block px-2 py-1 text-xs font-medium bg-white/20 rounded-full backdrop-blur-sm">
								{{ props.category || 'Experience' }}
							</span>
						</div>
						
						<!-- 标题 -->
						<h1 class="text-lg text-white font-bold mb-2 leading-tight lg:text-xl">{{ props.subtitle }}</h1>
						
						<!-- 分割线 -->
						<div class="w-10 h-0.5 bg-gradient-to-r from-white to-transparent mb-3 lg:w-12 lg:mb-4"></div>
					</div>
					
					<!-- 中间内容 -->
					<div class="flex-1 flex flex-col justify-center min-h-0">
						<p class="text-xs text-gray-100 leading-relaxed lg:text-sm">
							{{ props.description }}
						</p>
						
						<!-- 特性列表 -->
						<div v-if="props.features && props.features.length" class="mt-3 space-y-1.5 lg:mt-4 lg:space-y-2">
							<div v-for="(feature, index) in props.features" :key="index" class="flex items-center text-xs text-gray-300">
								<div class="w-1 h-1 bg-white/60 rounded-full mr-2 flex-shrink-0"></div>
								<span class="truncate">{{ feature }}</span>
							</div>
						</div>
					</div>
					
					<!-- 底部内容 -->
					<div class="flex-shrink-0 pt-3 lg:pt-4">
						<!-- 底部操作或装饰 -->
						<div class="flex items-center justify-between">
							<div class="text-xs text-gray-400 truncate">
								{{ props.meta || 'Explore More' }}
							</div>
							<div class="flex space-x-1">
								<div class="w-1.5 h-1.5 bg-white/40 rounded-full lg:w-2 lg:h-2"></div>
								<div class="w-1.5 h-1.5 bg-white/60 rounded-full lg:w-2 lg:h-2"></div>
								<div class="w-1.5 h-1.5 bg-white/40 rounded-full lg:w-2 lg:h-2"></div>
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
