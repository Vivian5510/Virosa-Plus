<template>
	<div>
		<Navigation />
		<div
			class="font-heading flex flex-col items-center justify-center px-4 py-6 md:px-8"
		>
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
		<ParticlesBg
			v-if="isHomeRoute || isAboutRoute"
			class="fixed inset-0 z-[-3]"
			:quantity="500"
			:ease="100"
			:color="isDark ? '#FFF' : '#000'"
			:staticity="10"
			refresh
		/>
		<SnowfallBg
			v-if="isOtherRoute"
			class="fixed inset-0 z-[-3]"
			:color="'ADD8E6'"
			:quantity="250"
			:min-radius="0.2"
			:max-radius="5"
			:speed="0.5"
			refresh
		/>
	</div>
</template>

<script setup lang="ts">
import ParticlesBg from '~/components/inspira/background/ParticlesBg.vue'
import SnowfallBg from '~/components/inspira/background/SnowfallBg.vue'

const colorMode = useColorMode()
const route = useRoute()

const isDark = computed(() => colorMode.value === 'dark')

// 判断是否是首页路由或子路由
const isHomeRoute = computed(() => route.path === '/')

// 判断是否是关于页路由或子路由
const isAboutRoute = computed(() => route.path === '/aboutme')

// 判断其他路由
const isOtherRoute = computed(() => !isHomeRoute.value && !isAboutRoute.value)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
