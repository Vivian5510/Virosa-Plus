<script setup lang="ts">
import { SwitchIcon } from 'vue-dark-switch'
import MorphingTabs from '~/components/inspira/miscellaneous/MorphingTabs.vue'
import DockIcon from '~/components/inspira/dock/DockIcon.vue'
import Dock from '~/components/inspira/dock/Dock.vue'
import GitHubIcon from '~/components/common/icons/GitHubIcon.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const routes = [
	{ path: '/', name: 'home' },
	{ path: '/article', name: 'article' },
	{ path: '/inspiration', name: 'inspiration' },
	{ path: '/aboutme', name: 'about' },
]

const route = useRoute()
const activeTab = ref(
	routes.find((r) => r.path.startsWith(route.path))?.name || 'home',
)

const goToLink = (to: string) => {
	window.location.href = to
}

// 控制移动端显示
const isMobileView = ref(false)

onMounted(() => {
	// 初始检查
	checkMobileView()

	// 添加resize监听
	window.addEventListener('resize', checkMobileView)

	// 组件卸载时清理
	onUnmounted(() => {
		window.removeEventListener('resize', checkMobileView)
	})
})

// 检查是否为移动视图
function checkMobileView() {
	isMobileView.value = window.innerWidth < 640
}
</script>

<template>
	<nav
		aria-label="Site Nav"
		class="mx-auto max-w-5xl flex items-center justify-between p-10 md:p-10 sm:p-10"
	>
		<div class="nav-item">
			<SwitchIcon unmount-persets />
		</div>

		<div
			v-if="!isMobileView"
			class="nav-item flex-1 scale-75 justify-center md:scale-100 sm:scale-90"
			style="display: flex"
		>
			<MorphingTabs
				:tabs="routes"
				:active-tab="activeTab"
				class="mx-auto"
				@update:active-tab="activeTab = $event"
			/>
		</div>

		<div class="nav-item justify-end">
			<div
				class="flex scale-75 items-center gap-2 md:scale-100 sm:scale-85 sm:gap-4"
			>
				<Dock
					class="mb-1 md:mb-5 sm:mb-3 dark:border-zinc-800"
					direction="'bottom'"
				>
					<DockIcon>
						<GitHubIcon @click="goToLink('https://github.com/Vivian5510')" />
					</DockIcon>
					<DockIcon>
						<img src="/svg/message.svg" @click="goToLink('/comment')" />
					</DockIcon>
					<DockIcon>
						<img src="/svg/issue.svg" @click="goToLink('/issue')" />
					</DockIcon>
				</Dock>

				<div class="ml-1 sm:ml-3">
					<Dropdown />
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.nav-item {
	@apply flex items-center transform-gpu;
}
</style>
