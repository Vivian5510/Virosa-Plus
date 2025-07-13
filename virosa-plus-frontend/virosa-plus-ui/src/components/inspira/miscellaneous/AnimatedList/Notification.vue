<template>
	<div
		:class="
			cn(
				'relative mx-auto min-h-fit w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl p-3 lg:p-4',
				// animation styles
				'transition-all duration-200 ease-in-out hover:scale-[103%]',
				// light styles
				'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
				// dark styles
				'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
			)
		"
	>
		<div class="flex flex-row items-center gap-2 lg:gap-3">
			<div
				class="size-8 flex items-center justify-center rounded-xl lg:size-10 lg:rounded-2xl"
				:style="`background-color: ${color}`"
			>
				<span class="text-sm lg:text-lg">{{ icon }}</span>
			</div>
			<div class="min-w-0 flex flex-1 flex-col overflow-hidden">
				<div
					class="flex flex-row items-center whitespace-pre text-sm font-medium lg:text-lg dark:text-white"
				>
					<span class="truncate text-xs lg:text-base sm:text-sm">{{
						name
					}}</span>
					<span class="mx-1 flex-shrink-0">·</span>
					<span class="flex-shrink-0 text-xs text-gray-500">{{ time }}</span>
				</div>
				<p
					class="line-clamp-2 text-xs font-normal lg:text-sm dark:text-white/60"
				>
					{{ description }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

type NotificationProps = {
	name: string
	description: string
	time: string
	icon: string
	color: string
}

withDefaults(defineProps<NotificationProps>(), {
	name: '',
	description: '',
	time: '',
	icon: '',
	color: '',
})
</script>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
