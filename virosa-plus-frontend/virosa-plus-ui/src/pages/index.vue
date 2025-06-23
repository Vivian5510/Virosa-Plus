<template>
	<div>
		<ScrollIsland title="Progress Bar 🚀">
			<div class="my-3 flex flex-col gap-2">
				<a href="#Welcome"># Welcome</a>
				<a v-if="!isMobileView" href="#Leading"># Leading</a>
				<a href="#Inspiration"># Inspiration</a>
				<a href="#Article"># Article</a>
				<a v-if="!isMobileView" href="#Recreation"># Recreation</a>
			</div>
		</ScrollIsland>

		<WelcomeSection id="Welcome" />
		<LeadingSection v-if="!isMobileView" id="Leading" />
		<InspirationSection id="Inspiration" />
		<ArticleSection id="Article" />
		<RecreationSection v-if="!isMobileView" id="Recreation" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import InspirationSection from '~/components/landing-page/index/InspirationSection.vue'
import WelcomeSection from '~/components/landing-page/index/WelcomeSection.vue'
import LeadingSection from '~/components/landing-page/index/LeadingSection.vue'
import ArticleSection from '~/components/landing-page/index/ArticleSection.vue'
import RecreationSection from '~/components/landing-page/index/RecreationSection.vue'
import ScrollIsland from '~/components/inspira/miscellaneous/ScrollIsland.vue'

// 检测是否是移动设备
const isMobileView = ref(true)

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
</script>

<style>
/* 确保在移动设备上强制隐藏 */
@media (max-width: 639px) {
	.sm\:block {
		display: none !important;
	}
}
</style>
