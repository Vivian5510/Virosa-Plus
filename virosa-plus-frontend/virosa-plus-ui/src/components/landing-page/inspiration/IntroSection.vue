<script setup lang="ts">
import Sparkles from '~/components/inspira/background/Sparkles.vue'
const mode = useColorMode()
const particlesColor = computed(() =>
	mode.value === 'dark' ? '#FFFFFF' : '#000000',
)
</script>

<template>
	<section>
		<div
			class="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md"
		>
			<div
				class="text-10xl relative z-20 text-center text-black font-bold lg:text-5xl md:text-3xl dark:text-white"
			>
				This place
			</div>
			<h1
				class="text-xl relative z-20 text-center text-black font-bold lg:text-5xl md:text-3xl dark:text-white"
			>
				For those who have sparked my spirit
			</h1>
			<div class="relative h-60 w-[40rem]">
				<div
					class="absolute inset-x-20 top-0 h-[2px] w-3/4 from-transparent via-indigo-500 to-transparent bg-gradient-to-r blur-sm"
				/>
				<div
					class="absolute inset-x-20 top-0 h-px w-3/4 from-transparent via-indigo-500 to-transparent bg-gradient-to-r"
				/>
				<div
					class="absolute inset-x-60 top-0 h-[5px] w-1/4 from-transparent via-sky-500 to-transparent bg-gradient-to-r blur-sm"
				/>
				<div
					class="absolute inset-x-60 top-0 h-px w-1/4 from-transparent via-sky-500 to-transparent bg-gradient-to-r"
				/>

				<Sparkles
					background="transparent"
					:min-size="0.4"
					:max-size="1.4"
					:particle-density="1200"
					class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] size-full"
					:particle-color="particlesColor"
				/>

				<div
					class="[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] absolute inset-0 size-full"
				></div>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
