<template>
	<div
		:class="
			cn(
				'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0',
				$props.class,
			)
		"
	>
		<div
			class="relative isolate z-0 w-full flex flex-1 scale-y-125 items-center justify-center"
		>
			<!-- Conic Gradient -->
			<div
				:style="{
					backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
				}"
				class="animate-conic-gradient [--conic-position:from_70deg_at_center_top] absolute inset-auto right-1/2 h-56 w-60 overflow-visible from-cyan-500 via-transparent to-transparent bg-gradient-conic text-white opacity-50"
			>
				<div
					class="[mask-image:linear-gradient(to_top,white,transparent)] absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950"
				/>
				<div
					class="[mask-image:linear-gradient(to_right,white,transparent)] absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950"
				/>
			</div>

			<div
				:style="{
					backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
				}"
				class="animate-conic-gradient [--conic-position:from_290deg_at_center_top] absolute inset-auto left-1/2 h-56 w-60 from-transparent via-transparent to-cyan-500 bg-gradient-conic text-white opacity-50"
			>
				<div
					class="[mask-image:linear-gradient(to_left,white,transparent)] absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-950"
				/>
				<div
					class="[mask-image:linear-gradient(to_top,white,transparent)] absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-950"
				/>
			</div>

			<div
				class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"
			></div>

			<div
				class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"
			></div>

			<div
				class="absolute inset-auto z-50 h-36 w-[28rem] rounded-full bg-cyan-500 opacity-50 blur-3xl -translate-y-1/2"
			></div>

			<!-- Spotlight -->
			<div
				class="animate-spotlight absolute inset-auto z-30 h-36 w-32 rounded-full bg-cyan-400 blur-2xl -translate-y-24"
			></div>

			<!-- Glowing Line -->
			<div
				class="animate-glowing-line absolute inset-auto z-50 h-0.5 w-60 bg-cyan-400 -translate-y-28"
			></div>

			<div
				class="absolute inset-auto z-40 h-44 w-full translate-y-[-12.5rem] bg-slate-950"
			></div>
		</div>

		<div class="relative z-50 flex flex-col items-center px-5 -translate-y-80">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from '@vue/runtime-dom'
import { cn } from '~/lib/utils'

interface LampEffectProps {
	delay?: number
	duration?: number
	class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<LampEffectProps>(), {
	delay: 0.5,
	duration: 0.8,
})

const durationInSeconds = computed(() => `${props.duration}s`)
const delayInSeconds = computed(() => `${props.delay}s`)
</script>

<style scoped>
/* Spotlight Animation */
.animate-spotlight {
	animation: spotlight-anim ease-in-out v-bind(durationInSeconds) forwards;
	animation-delay: v-bind(delayInSeconds);
}

/* Glowing Line Animation */
.animate-glowing-line {
	animation: glowing-line-anim ease-in-out v-bind(durationInSeconds) forwards;
	animation-delay: v-bind(delayInSeconds);
}

/* Conic Gradient Animation */
.animate-conic-gradient {
	animation: conic-gradient-anim ease-in-out v-bind(durationInSeconds) forwards;
	animation-delay: v-bind(delayInSeconds);
}

/* Keyframes for Spotlight */
@keyframes spotlight-anim {
	from {
		width: 8rem;
	}
	to {
		width: 16rem;
	}
}

/* Keyframes for Glowing Line */
@keyframes glowing-line-anim {
	from {
		width: 15rem;
	}
	to {
		width: 30rem;
	}
}

/* Keyframes for Conic Gradient */
@keyframes conic-gradient-anim {
	from {
		opacity: 0.5;
		width: 15rem;
	}
	to {
		opacity: 1;
		width: 30rem;
	}
}
</style>
