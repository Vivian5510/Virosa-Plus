<template>
	<div class="relative min-h-screen transition-colors duration-300">
		<Navigation />
		<main
			class="font-heading relative z-10 flex flex-col items-center justify-center transition-all duration-300"
			:class="{
				'px-4 py-6 md:px-8': true,
				'pt-8': true, // 为sticky导航留出空间
			}"
		>
			<router-view v-slot="{ Component }">
				<transition
					name="page"
					mode="out-in"
					enter-active-class="transition-all duration-300 ease-out"
					enter-from-class="opacity-0 scale-95 translate-y-4"
					enter-to-class="opacity-100 scale-100 translate-y-0"
					leave-active-class="transition-all duration-200 ease-in"
					leave-from-class="opacity-100 scale-100 translate-y-0"
					leave-to-class="opacity-0 scale-95 -translate-y-4"
				>
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
		<!-- 背景动画层 -->
		<ParticlesBg
			v-if="isHomeRoute || isAboutRoute"
			class="fixed inset-0 z-0"
			:quantity="500"
			:ease="100"
			:color="isDark ? '#FFF' : '#000'"
			:staticity="10"
			refresh
		/>
		<SnowfallBg
			v-if="isOtherRoute"
			class="fixed inset-0 z-0"
			:color="'ADD8E6'"
			:quantity="250"
			:min-radius="0.2"
			:max-radius="5"
			:speed="0.5"
			refresh
		/>

		<!-- 页面背景色（在动画之上，内容之下） -->
		<div
			class="pointer-events-none fixed inset-0 z-5"
			:class="{
				'bg-gray-50/80 dark:bg-gray-900/80': isOtherRoute,
				'bg-transparent': isHomeRoute || isAboutRoute,
			}"
		></div>
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
