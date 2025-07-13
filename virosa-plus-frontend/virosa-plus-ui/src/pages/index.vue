<template>
	<div class="space-y-0">
		<!-- 进度条导航 -->
		<ScrollIsland title="Progress Bar 🚀">
			<div class="my-3 flex flex-col gap-2">
				<a href="#Welcome" class="transition-colors hover:text-blue-500"
					># Welcome</a
				>
				<a
					href="#Leading"
					class="hidden transition-colors md:block hover:text-blue-500"
					># Leading</a
				>
				<a href="#Inspiration" class="transition-colors hover:text-blue-500"
					># Inspiration</a
				>
				<a href="#Article" class="transition-colors hover:text-blue-500"
					># Article</a
				>
				<a
					href="#Recreation"
					class="hidden transition-colors md:block hover:text-blue-500"
					># Recreation</a
				>
			</div>
		</ScrollIsland>

		<!-- 页面内容区 -->
		<main class="responsive-sections">
			<WelcomeSection id="Welcome" />
			<LeadingSection id="Leading" />
			<InspirationSection id="Inspiration" />
			<ArticleSection id="Article" />
			<RecreationSection id="Recreation" />
		</main>
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

<!-- 样式已移动到全局响应式样式文件 -->
