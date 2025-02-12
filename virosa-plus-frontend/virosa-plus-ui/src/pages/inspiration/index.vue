<script setup lang="ts">
import IntroSection from '~/components/landing-page/inspiration/IntroSection.vue'
import BookSection from '~/components/landing-page/inspiration/BookSection.vue'
import FamousSection from '~/components/landing-page/inspiration/FamousSection.vue'
import VideoSection from '~/components/landing-page/inspiration/VideoSection.vue'
import ScrollIsland from '~/components/inspira/miscellaneous/ScrollIsland.vue'

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
				<a href="#famous"># Famous</a>
				<a href="#video"># Video</a>
			</div>
		</ScrollIsland>

		<IntroSection id="intro" />
		<BookSection  id="book" />
		<FamousSection  id="famous" />
		<VideoSection  id="video" />
	</div>
</template>

<style scoped></style>
