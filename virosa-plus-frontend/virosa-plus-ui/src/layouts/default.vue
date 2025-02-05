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
			class="fixed inset-0 z-[-3]"
			:quantity="250"
			:ease="100"
			:color="isDark ? '#FFF' : '#000'"
			:staticity="10"
			refresh
		/>
	</div>
</template>

<script setup lang="ts">
import ParticlesBg from '~/components/inspira/background/ParticlesBg.vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
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
