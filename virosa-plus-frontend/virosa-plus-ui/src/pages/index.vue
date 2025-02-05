<template>
	<div>
		<ScrollIsland title="Progress Bar 🚀">
			<div class="my-3 flex flex-col gap-2">
				<a href="#Welcome"># Welcome</a>
				<a href="#Leading"># Leading</a>
				<a href="#Inspiration"># Inspiration</a>
				<a href="#Article"># Article</a>
				<a href="#Recreation"># Recreation</a>
			</div>
		</ScrollIsland>

		<WelcomeSection />
		<LeadingSection />
		<InspirationSection />
		<ArticleSection />
		<RecreationSection />
	</div>
</template>

<script setup lang="ts">
import InspirationSection from '~/components/landing-page/InspirationSection.vue'
import WelcomeSection from '~/components/landing-page/WelcomeSection.vue'
import LeadingSection from '~/components/landing-page/LeadingSection.vue'
import ArticleSection from '~/components/landing-page/ArticleSection.vue'
import RecreationSection from '~/components/landing-page/RecreationSection.vue'
import ScrollIsland from '~/components/inspira/miscellaneous/ScrollIsland.vue'
</script>

<style></style>
