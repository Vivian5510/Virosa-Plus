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

		<WelcomeSection id="Welcome" />
		<LeadingSection id="Leading" />
		<InspirationSection id="Inspiration" />
		<ArticleSection id="Article" />
		<RecreationSection id="Recreation" />
	</div>
</template>

<script setup lang="ts">
import InspirationSection from '~/components/landing-page/index/InspirationSection.vue'
import WelcomeSection from '~/components/landing-page/index/WelcomeSection.vue'
import LeadingSection from '~/components/landing-page/index/LeadingSection.vue'
import ArticleSection from '~/components/landing-page/index/ArticleSection.vue'
import RecreationSection from '~/components/landing-page/index/RecreationSection.vue'
import ScrollIsland from '~/components/inspira/miscellaneous/ScrollIsland.vue'
</script>

<style></style>
