<script setup lang="ts">
import { SwitchIcon } from 'vue-dark-switch'
import MorphingTabs from '~/components/inspira/miscellaneous/MorphingTabs.vue'
import DockIcon from '~/components/inspira/dock/DockIcon.vue'
import Dock from '~/components/inspira/dock/Dock.vue'
import GitHubIcon from '~/components/common/icons/GitHubIcon.vue'

const routes = [
	{ path: '/', name: 'home' },
	{ path: '/article', name: 'article' },
	{ path: '/inspiration', name: 'inspiration' },
	{ path: '/aboutme', name: 'about' },
]

const route = useRoute() // 获取当前路由
const activeTab = ref(
	routes.find((r) => r.path.startsWith(route.path))?.name || 'home',
) // 匹配当前路由

const goToLink = (to: string) => {
	window.location.href = to
}
</script>

<template>
	<nav
		aria-label="Site Nav"
		class="mx-auto h-80px max-w-5xl flex items-center justify-between p-4"
	>
		<div class="mr-auto items-center justify-center space-x-5">
			<SwitchIcon unmount-persets />
		</div>

		<div class="mr-auto items-center justify-center space-x-5">
			<MorphingTabs
				:tabs="routes"
				:active-tab="activeTab"
				@update:active-tab="activeTab = $event"
			/>
		</div>

		<div class="ml-auto flex items-center space-x-6">
			<Dock class="mb-6" direction="'bottom'">
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

			<Dropdown />
		</div>
	</nav>
</template>
