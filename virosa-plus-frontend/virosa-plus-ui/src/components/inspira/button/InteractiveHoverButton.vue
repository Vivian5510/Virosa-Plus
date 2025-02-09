<template>
	<button
		ref="buttonRef"
		:class="
			cn(
				'group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center fonts-semibold',
				props.class,
			)
		"
	>
		<span
			class="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
		>
			{{ text }}
		</span>

		<div
			class="text-primary-foreground absolute top-0 z-10 size-full flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1"
		>
			<span>
				<a href="/article"> {{ text }} </a>
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-arrow-right"
			>
				<path d="M5 12h14" />
				<path d="m12 5 7 7-7 7" />
			</svg>
		</div>
		<div
			class="bg-primary group-hover:bg-primary absolute left-[18%] top-[40%] size-2 scale-100 rounded-lg transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:size-full group-hover:scale-[1.8]"
		></div>
	</button>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'

interface Props {
	text?: string
	class?: string
}
const props = withDefaults(defineProps<Props>(), {
	text: 'Button',
})

const buttonRef = ref<HTMLButtonElement>()
</script>

<style></style>
