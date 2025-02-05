<template>
	<div
		ref="containerRef"
		class="relative h-[60rem] flex items-center justify-center p-2 md:h-[80rem] md:p-20"
	>
		<div class="relative w-3/4 py-10 md:py-40" style="perspective: 1000px">
			<ContainerScrollTitle :translate="translateY">
				<slot name="title"></slot>
			</ContainerScrollTitle>
			<ContainerScrollCard :rotate="rotate" :scale="scale">
				<slot name="card" />
			</ContainerScrollCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useWindowSize, useScroll, useElementBounding } from '@vueuse/core'
import ContainerScrollTitle from '~/components/inspira/container-scroll/ContainerScrollTitle.vue'
import ContainerScrollCard from '~/components/inspira/container-scroll/ContainerScrollCard.vue'

const containerRef = ref(null)
const isMobile = ref(false)

function updateIsMobile() {
	isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
	updateIsMobile()
	window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateIsMobile)
})

const { height } = useWindowSize()
const { y: scrollY } = useScroll(window)
const { bottom } = useElementBounding(containerRef)

const scrollYProgress = computed(() => {
	if (!bottom.value) return 0
	return 1 - Math.max(0, bottom.value - scrollY.value) / height.value
})

const scaleDimensions = computed(() =>
	isMobile.value ? [0.7, 0.9] : [1.05, 1],
)

const rotate = computed(() => 20 * (1 - scrollYProgress.value))
const scale = computed(() => {
	const [start, end] = scaleDimensions.value
	return start + (end - start) * scrollYProgress.value
})
const translateY = computed(() => -100 * scrollYProgress.value)
</script>
