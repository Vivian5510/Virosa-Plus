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
		<!-- 背景动画层 - 使用动态组件实现真正的按需加载 -->
		<component
			:is="backgroundComponent"
			v-if="backgroundComponent"
			class="fixed inset-0 z-0"
			v-bind="backgroundProps"
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
// 使用异步组件实现懒加载，只有真正需要时才加载
const ParticlesBg = defineAsyncComponent(
	() => import('~/components/inspira/background/ParticlesBg.vue')
)
const SnowfallBg = defineAsyncComponent(
	() => import('~/components/inspira/background/SnowfallBg.vue')
)

const colorMode = useColorMode()
const route = useRoute()

const isDark = computed(() => colorMode.value === 'dark')

// 判断是否是首页路由或子路由
const isHomeRoute = computed(() => route.path === '/')

// 判断是否是关于页路由或子路由
const isAboutRoute = computed(() => route.path === '/aboutme')

// 判断其他路由
const isOtherRoute = computed(() => !isHomeRoute.value && !isAboutRoute.value)

// 动态背景组件 - 只会实例化当前需要的组件
const backgroundComponent = computed(() => {
	if (isHomeRoute.value || isAboutRoute.value) {
		return ParticlesBg
	} else if (isOtherRoute.value) {
		return SnowfallBg
	}
	return null
})

// 动态背景属性 - 根据当前路由返回对应的props
const backgroundProps = computed(() => {
	if (isHomeRoute.value || isAboutRoute.value) {
		return {
			quantity: 500,
			ease: 100,
			color: isDark.value ? '#FFF' : '#000',
			staticity: 10,
			refresh: true,
		}
	} else if (isOtherRoute.value) {
		return {
			color: 'ADD8E6',
			quantity: 250,
			minRadius: 0.2,
			maxRadius: 5,
			speed: 0.5,
			refresh: true,
		}
	}
	return {}
})
</script>

<style></style>
