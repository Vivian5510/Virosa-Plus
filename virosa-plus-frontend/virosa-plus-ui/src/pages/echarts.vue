<template>
	<section>
		<!-- 侧边栏 -->
		<div class="flex">
			<aside class="hidden h-screen w-80 p-4 md:block"></aside>
			<!-- Closing tag added correctly here -->

			<div>
				<!-- 主内容区域 -->
				<main class="p-8">
					<img v-if="isDark" src="/svg/snake-Dark.svg" />
					<img v-if="!isDark" src="/svg/snake-Light.svg" />
					<h1 class="text-2xl font-bold">主要内容</h1>
					<p class="mt-4">这里是主要内容区域。</p>
				</main>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
</script>
