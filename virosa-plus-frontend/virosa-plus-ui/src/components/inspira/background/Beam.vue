<template>
	<Motion
		:style="{
			'--x': `${props.x}`,
			'--width': `${props.width}`,
			'--aspect-ratio': `${ar}`,
			'--background': `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
		}"
		class="[aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)] absolute left-[var(--x)] top-0"
		:initial="{
			x: '-50%',
			y: '100cqmax',
		}"
		:animate="{
			x: '-50%',
			y: '-100%',
		}"
		:transition="{
			duration: props.duration,
			delay: props.delay,
			repeat: Infinity,
			ease: 'linear',
		}"
	></Motion>
</template>

<script lang="ts" setup>
import { Motion } from 'motion-v'

interface Props {
	width: string | number
	x: string | number
	delay: number
	duration: number
}
const props = defineProps<Props>()

const hue = computed(() => Math.floor(Math.random() * 360))
const ar = computed(() => Math.floor(Math.random() * 10) + 1)
</script>

<style></style>
