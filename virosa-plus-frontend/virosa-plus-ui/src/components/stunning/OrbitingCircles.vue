<script setup lang="ts">
import { cn } from '@/lib/utils'

interface OrbitingCirclesProps {
	class?: string
	reverse?: boolean
	duration?: number
	delay?: number
	radius?: number
	path?: boolean
}

const props = withDefaults(defineProps<OrbitingCirclesProps>(), {
	duration: 20,
	delay: 10,
	radius: 50,
	path: true,
})

const className = cn(
	'absolute flex size-full animate-reverse transform-gpu animate-orbit items-center justify-center rounded-full border bg-none [animation-delay:calc(var(--delay)*1000ms)]',
	props.class,
	{ '[animate-direction:reverse]': props.reverse },
)
</script>

<template>
	<div v-if="props.path">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			class="pointer-events-none absolute inset-0 size-full"
		>
			<circle
				class="stroke-1 stroke-black/10 dark:stroke-white/10"
				cx="50%"
				cy="50%"
				:r="radius"
				fill="none"
			/>
		</svg>
	</div>

	<div
		:style="{
			'--duration': props.duration,
			'--radius': props.radius,
			'--delay': -props.delay,
		}"
		:class="className"
	>
		<slot />
	</div>
</template>
