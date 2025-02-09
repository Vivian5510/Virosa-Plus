<template>
	<div
		:class="
			cn(
				'glass-border-button group bg-white/10 rounded-xl relative h-12 cursor-pointer shadow-sm shadow-black/5',
			)
		"
	>
		<div
			:class="
				cn(
					'glass-border absolute -left-[3px] -top-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] overflow-hidden rounded-xl z-0',
					'after:content-[\'\'] after:w-full after:h-full after:absolute after:left-0 after:top-0 after:rounded-xl after:border-[0.5px] after:border-white/20',
				)
			"
		>
			<div
				class="[animation-duration:5s] absolute left-[-42px] top-[-90px] aspect-square h-auto w-[150%] animate-spin blur"
				:style="{
					background: conicGradient,
				}"
			/>
		</div>

		<div
			:class="
				cn(
					'z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl px-8 py-1 fonts-medium',
					'bg-gradient-to-t from-neutral-100/90  to-neutral-50 backdrop-blur-2xl',
					'group-hover:from-neutral-200/90 group-hover:to-neutral-50',
				)
			"
		>
			<div
				class="flex items-center justify-center gap-2 text-neutral-950 transition-transform duration-100 ease-in-out group-hover:scale-105"
			>
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { colord } from 'colord'
import { cn } from '~/lib/utils'

const props = withDefaults(
	defineProps<{
		color: string
	}>(),
	{ color: '#ffffff' },
)

const conicGradient = computed(() => {
	const alphaColor = colord(props.color).alpha(0.12).toRgbString()
	return `conic-gradient(from 90deg at 50% 50%, ${alphaColor} 0, ${alphaColor} 10%, ${props.color} 20%, ${alphaColor} 30%, ${alphaColor} 60%, ${props.color} 70%, ${alphaColor} 80%, ${alphaColor} 100%)`
})
</script>

<style scoped></style>
