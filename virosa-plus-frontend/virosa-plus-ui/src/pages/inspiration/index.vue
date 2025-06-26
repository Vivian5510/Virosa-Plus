<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IntroSection from '~/components/landing-page/inspiration/IntroSection.vue'
import BookSection from '~/components/landing-page/inspiration/BookSection.vue'
import FamousSection from '~/components/landing-page/inspiration/FamousSection.vue'
import VideoSection from '~/components/landing-page/inspiration/VideoSection.vue'
import ScrollIsland from '~/components/inspira/miscellaneous/ScrollIsland.vue'

// 检测是否是移动设备
const isMobileView = ref(false)

const checkMobileView = () => {
	isMobileView.value = window.innerWidth < 640
}

onMounted(() => {
	checkMobileView()
	window.addEventListener('resize', checkMobileView)
})

onUnmounted(() => {
	window.removeEventListener('resize', checkMobileView)
})

definePage({
	alias: ['/inspiration'],
	meta: {
		layout: 'default',
	},
})
</script>

<template>
	<div>
		<ScrollIsland title="Progress Bar 🚀">
			<div class="my-3 flex flex-col gap-2">
				<a href="#intro"># Intro</a>
				<a href="#book"># Book</a>
				<a v-if="!isMobileView" href="#famous"># Famous</a>
				<a href="#video"># Video</a>
			</div>
		</ScrollIsland>

		<IntroSection id="intro" />
		<BookSection id="book" />
		<FamousSection v-if="!isMobileView" id="famous" />
		<VideoSection id="video" />
	</div>
</template>

<style scoped>
/* 确保在移动设备上强制隐藏 */
@media (max-width: 639px) {
	.sm\:block {
		display: none !important;
	}
}
</style>
