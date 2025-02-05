<script setup lang="ts">
import { SwitchIcon } from 'vue-dark-switch'
import MorphingTabs from '~/components/inspira/miscellaneous/MorphingTabs.vue'
import DockIcon from '~/components/inspira/dock/DockIcon.vue'
import GoogleDriveIcon from '~/components/common/icons/GoogleDriveIcon.vue'
import Dock from '~/components/inspira/dock/Dock.vue'
import GitHubIcon from '~/components/common/icons/GitHubIcon.vue'
import OpenAIIcon from '~/components/common/icons/OpenAIIcon.vue'

const routes = [
	{ path: '/', name: 'home' },
	{ path: '/articles', name: 'echarts' },
	{ path: '/about', name: 'about' },
	// 根据需要添加更多菜单项
]
const activeTab = ref(routes[0].name)
</script>

<template>
	<nav
		aria-label="Site Nav"
		class="mx-auto h-80px max-w-3xl flex items-center justify-between p-4"
	>
		<div class="mr-auto flex items-center justify-center space-x-5">
			<SwitchIcon unmount-persets />
		</div>

		<MorphingTabs
			:tabs="routes"
			:active-tab="activeTab"
			@update:active-tab="activeTab = $event"
		/>

		<div class="ml-auto flex items-center space-x-6">
			<Dock class="mb-6" direction="'bottom'">
				<DockIcon>
					<GitHubIcon />
				</DockIcon>
				<DockIcon>
					<GoogleDriveIcon />
				</DockIcon>
				<DockIcon>
					<OpenAIIcon />
				</DockIcon>
			</Dock>

			<Dropdown />
		</div>
	</nav>
</template>
