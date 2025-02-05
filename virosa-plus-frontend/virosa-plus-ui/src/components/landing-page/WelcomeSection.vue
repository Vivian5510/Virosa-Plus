<script setup lang="ts">
import ContainerScroll from '~/components/inspira/container-scroll/ContainerScroll.vue'
import TextHighlight from '~/components/inspira/text/TextHighlight.vue'
import FlipWords from '~/components/inspira/text/FlipWords.vue'
</script>

<template>
	<section id="Welcome">
		<div class="flex flex-col overflow-hidden">
			<ContainerScroll>
				<template #title>
					<h1 class="text-4xl text-black font-semibold dark:text-white">
						“Welcome, wanderer, to Virosa’s light, Where inspira awaken and
						dreams take flight.” <br />
						<span class="mt-1 text-6xl font-bold leading-none md:text-[6rem]">
							This's
							<TextHighlight
								class="rounded-xl from-pink-500 to-violet-500 bg-gradient-to-r px-4 py-1"
								text-end-color="hsl(var(--accent))"
							>
								<FlipWords :words="[' rosy ', 'virosa']" :duration="3000" />
							</TextHighlight>
							👋
						</span>
					</h1>
				</template>
				<template #card>
					<img
						src="/photo-vision-pro.avif"
						class="mx-auto h-full rounded-2xl object-cover object-left-top"
						alt="hero"
						height="2000"
						width="2000"
					/>
				</template>
			</ContainerScroll>
		</div>
	</section>
</template>

<style scoped></style>
