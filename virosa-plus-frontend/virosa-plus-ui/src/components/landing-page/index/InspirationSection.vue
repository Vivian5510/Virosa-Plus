<template>
	<section
		class="mb-50 max-w-7xl w-full flex flex-col items-center justify-center px-4"
	>
		<BlurReveal :delay="0" :duration="1.5">
			<div
				class="mb-6 text-center text-3xl font-semibold md:text-5xl sm:text-4xl"
			>
				Inspiration ✨
			</div>
			<div
				class="text-center text-lg text-black font-semibold md:text-3xl sm:text-2xl dark:text-white"
			>
				"This place is a sanctuary for the souls and stories that once ignited
				my spirit, where their whispers linger like timeless echoes in the
				garden of memory."
			</div>
			<span
				class="grid mt-6 w-full gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
			>
				<CardSpotlight
					v-for="inspiration in inspirations"
					:key="inspiration.title"
					class="relative h-72 w-full flex flex-col items-start justify-start overflow-hidden border border-zinc-200 rounded-2xl px-6 py-8 shadow-xl backdrop-blur-md md:h-64 sm:h-80 dark:border-zinc-800 dark:bg-zinc-900/50"
					:gradient-color="isDark ? '#262626' : '#E9E9E9'"
				>
					<h3 class="relative z-50 mb-4 text-xl font-bold dark:text-white">
						{{ inspiration.title }}
					</h3>

					<p class="relative z-50 mb-4 text-base text-zinc-500 font-normal">
						{{ inspiration.description }}
					</p>

					<RainbowButton class="ml-25 mt-9 min-w-32">
						<RadiantText
							class="inline-flex items-center justify-center px-2 py-1 transition ease-out hover:text-white hover:duration-300 hover:dark:text-black"
							:duration="5"
						>
							<span class="whitespace-nowrap text-xl font-bold">
								<a :href="inspiration.href">Learn More</a>
							</span>
						</RadiantText>
					</RainbowButton>

					<Meteors />
				</CardSpotlight>
			</span>
		</BlurReveal>
	</section>
</template>

<script lang="ts" setup>
import Meteors from '~/components/inspira/special-effects/Meteors.vue'
import CardSpotlight from '~/components/inspira/card/CardSpotlight.vue'
import BlurReveal from '~/components/inspira/special-effects/BlurReveal.vue'
import RainbowButton from '~/components/inspira/button/RainbowButton.vue'
import RadiantText from '~/components/inspira/text/RadiantText.vue'
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const inspirations = [
	{
		title: 'Great Minds',
		description:
			'Their wisdom shapes time, their courage ignites paths. In their echoes, I find strength to walk my own journey.',
		href: '/inspiration',
	},
	{
		title: 'Books',
		description:
			'Each Book is a window to the infinite, where words weave worlds and every page whispers new horizons.',
		href: '/inspiration',
	},
	{
		title: 'Video & Audio',
		description:
			"Light and shadow unveil the soul's depths—love, loss, and the fleeting truths that linger beyond the screen.",
		href: '/inspiration',
	},
]
</script>
