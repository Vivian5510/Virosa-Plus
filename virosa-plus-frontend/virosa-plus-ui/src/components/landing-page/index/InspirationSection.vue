<template>
	<section
		:class="[
			'w-full max-w-7xl flex flex-col items-center justify-center mx-auto',
			isMobile ? 'mb-20 px-4' : isTablet ? 'mb-32 px-6' : 'mb-50 px-8',
		]"
	>
		<BlurReveal :delay="0" :duration="1.5">
			<!-- 响应式标题 -->
			<div :class="['mb-6 text-center font-semibold', titleClasses]">
				Inspiration ✨
			</div>

			<!-- 响应式副标题 -->
			<div
				:class="[
					'text-center text-black font-semibold dark:text-white',
					subtitleClasses,
				]"
			>
				"This place is a sanctuary for the souls and stories that once ignited
				my spirit, where their whispers linger like timeless echoes in the
				garden of memory."
			</div>

			<!-- 响应式卡片网格 -->
			<div :class="gridClasses">
				<CardSpotlight
					v-for="inspiration in inspirations"
					:key="inspiration.title"
					:class="[
						'relative w-full flex flex-col items-start justify-start overflow-hidden border border-zinc-200 rounded-2xl shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/50',
						cardHeightClasses,
						isMobile ? 'px-4 py-6' : 'px-6 py-8',
					]"
					:gradient-color="isDark ? '#262626' : '#E9E9E9'"
				>
					<h3
						:class="[
							'relative z-50 mb-4 font-bold dark:text-white',
							isMobile ? 'text-lg' : 'text-xl',
						]"
					>
						{{ inspiration.title }}
					</h3>

					<p
						:class="[
							'relative z-50 text-zinc-500 font-normal',
							isMobile ? 'text-sm mb-16' : 'text-base mb-20',
						]"
					>
						{{ inspiration.description }}
					</p>

					<RainbowButton
						:class="['absolute bottom-0 right-0 min-w-32 z-60 m-2 !py-0']"
						style="
							position: absolute !important;
							bottom: 0 !important;
							right: 0 !important;
							margin: 0.5rem !important;
							padding-top: 0 !important;
							padding-bottom: 0 !important;
						"
					>
						<RadiantText
							:class="[
								'inline-flex items-center justify-center px-2 py-1 transition ease-out hover:text-white hover:duration-300 hover:dark:text-black',
							]"
							:duration="5"
						>
							<span
								:class="[
									'whitespace-nowrap font-bold',
									isMobile ? 'text-lg' : 'text-xl',
								]"
							>
								<a :href="inspiration.href">Learn More</a>
							</span>
						</RadiantText>
					</RainbowButton>

					<Meteors />
				</CardSpotlight>
			</div>
		</BlurReveal>
	</section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useResponsive } from '~/composables/useResponsive'
import Meteors from '~/components/inspira/special-effects/Meteors.vue'
import CardSpotlight from '~/components/inspira/card/CardSpotlight.vue'
import BlurReveal from '~/components/inspira/special-effects/BlurReveal.vue'
import RainbowButton from '~/components/inspira/button/RainbowButton.vue'
import RadiantText from '~/components/inspira/text/RadiantText.vue'

const colorMode = useColorMode()
const { isMobile, isTablet, isDesktop } = useResponsive()

const isDark = computed(() => colorMode.value === 'dark')

// 响应式标题大小
const titleClasses = computed(() => {
	if (isMobile.value) {
		return 'text-2xl'
	} else if (isTablet.value) {
		return 'text-4xl'
	} else {
		return 'text-5xl'
	}
})

// 响应式副标题大小
const subtitleClasses = computed(() => {
	if (isMobile.value) {
		return 'text-base'
	} else if (isTablet.value) {
		return 'text-xl'
	} else {
		return 'text-3xl'
	}
})

// 响应式网格配置
const gridClasses = computed(() => {
	if (isMobile.value) {
		return 'grid mt-6 w-full gap-4 grid-cols-1'
	} else if (isTablet.value) {
		return 'grid mt-6 w-full gap-6 grid-cols-2'
	} else {
		return 'grid mt-6 w-full gap-6 grid-cols-3'
	}
})

// 响应式卡片高度
const cardHeightClasses = computed(() => {
	if (isMobile.value) {
		return 'h-64'
	} else if (isTablet.value) {
		return 'h-72'
	} else {
		return 'h-72'
	}
})

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
