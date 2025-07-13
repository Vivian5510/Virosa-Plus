<template>
	<section
		class="mb-16 max-w-7xl w-full flex flex-col items-center justify-center px-4 lg:mb-50 md:mb-32 lg:px-8 sm:px-6"
	>
		<BlurReveal :delay="0" :duration="1.5">
			<div class="max-w-7xl w-full flex flex-col items-center justify-center">
				<div
					class="py-3 text-center text-3xl font-semibold sm:py-5 lg:text-5xl sm:text-4xl"
				>
					Reflections on Life's Lessons
					<span class="text-2xl lg:text-4xl sm:text-3xl"> ❤️</span>
				</div>
				<div
					class="mb-4 text-center text-xl text-black font-semibold sm:mb-6 lg:text-3xl sm:text-2xl dark:text-white"
				>
					"In the quiet hum of life's ebb and flow, I discover lessons hidden in
					the ordinary moments. Here, I share the whispers of my learning, a
					mosaic of thoughts, notes, and reflections from the paths I've
					walked."
				</div>
				<div
					class="dark:bg-background relative h-[300px] w-full overflow-hidden border border-black/[0.1] rounded-xl bg-gray-50 px-2 py-4 shadow-lg lg:h-[430px] md:h-[400px] sm:h-[350px] dark:border-white/[0.2] dark:bg-black sm:px-4 sm:py-6"
				>
					<!-- Logo -->
					<div
						class="absolute left-1/2 top-4 z-20 mt-2 border rounded-3xl bg-white/30 p-2 backdrop-blur-md sm:top-8 sm:mt-4 -translate-x-1/2 dark:border-zinc-800 sm:p-3"
					>
						<img
							v-if="isDark"
							src="/logo-dark.svg"
							alt=""
							class="h-auto w-16 md:w-24 sm:w-20"
						/>
						<img
							v-else
							src="/logo.svg"
							alt=""
							class="h-auto w-16 md:w-24 sm:w-20"
						/>
					</div>

					<!-- Center Text -->
					<div
						class="absolute inset-0 z-10 mt-16 flex flex-col items-center justify-center px-2 text-center sm:mt-20 sm:px-4"
					>
						<p class="m-2 text-sm sm:m-4 md:text-lg sm:text-base">
							What are you waiting for?
						</p>
						<h3
							class="mb-2 text-2xl font-bold lg:text-5xl md:text-4xl sm:text-3xl"
						>
							START READING AND LEARN MORE ABOUT ME 😄
						</h3>
						<InteractiveHoverButton
							class="mt-2 w-40 border-black/[0.1] bg-gray-50 sm:mt-4 md:w-56 sm:w-48 dark:border-white/[0.2] dark:bg-black"
							text="Get Started"
						/>
					</div>

					<!-- Tilted Marquees -->
					<div class="absolute inset-0 overflow-hidden">
						<Marquee
							v-for="(config, index) in marqueeConfigs"
							:key="index"
							:style="{ transform: config.transform }"
							:reverse="config.reverse"
							:class="['marquee', config.extraClasses]"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in reviewList"
								:key="review.username"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
								:truncate="config.truncate ? isMobileScreen : false"
							/>
						</Marquee>
					</div>

					<!-- Gradient overlay to fade to white at the bottom -->
					<div
						class="dark:from-background pointer-events-none absolute inset-0 from-white to-transparent bg-gradient-to-t"
					></div>
					<BorderBeam :size="250" :duration="12" :delay="9" :border-width="2" />
				</div>
			</div>
		</BlurReveal>
	</section>
</template>

<script setup lang="ts">
import { useResponsive } from '~/composables/useResponsive'
import Marquee from '~/components/inspira/card/marquee/Marquee.vue'
import ReviewCard from '~/components/inspira/card/marquee/ReviewCard.vue'
import InteractiveHoverButton from '~/components/inspira/button/InteractiveHoverButton.vue'
import BorderBeam from '~/components/inspira/special-effects/BorderBeam.vue'
import BlurReveal from '~/components/inspira/special-effects/BlurReveal.vue'

// 使用统一的响应式和颜色模式管理
const { isDark } = useColorMode()
const { isMobile } = useResponsive()

// 为了保持兼容性，创建别名
const isMobileScreen = isMobile

const reviewList = [
	{
		name: 'Kiri',
		username: '@kiruba_selvi6',
		body: 'Omg, this is next level! ✨🔥 Love the vibes here!!',
		img: 'notFound/1.svg',
	},
	{
		name: 'Sébastien Chopin',
		username: '@Atinux',
		body: 'Damn, you really out here shipping top-tier content 🚀💯',
		img: 'notFound/23.svg',
	},
	{
		name: 'Mattia Guariglia',
		username: '@matt_guariglia',
		body: "I'm actually obsessed 🥹💖 The aesthetics, the depth—everything!!",
		img: 'notFound/33.svg',
	},
	{
		name: 'Nelson🐐',
		username: '@Mathiasokafor3',
		body: 'Bro, this blog is a goldmine for devs & deep thinkers 🏆🙏 Thx for sharing!',
		img: 'https://inspira-ui.com/images/x-logo.svg',
	},
	{
		name: 'Pierre',
		username: '@PierreHenryBap',
		body: "Yo, this is sick! 👀 Found it a few days ago & already hooked. Can't wait to dive in!",
		img: 'notFound/5.svg',
	},
	{
		name: 'Waldemar Enns',
		username: '@WaldemarEnns',
		body: 'Just bookmarked this 🔖 Instantly one of my fav spots on the internet!',
		img: 'notFound/32.svg',
	},
	{
		name: 'Premdas Vm',
		username: '@premdasvm',
		body: 'Man, this is SO good! Vue/Nuxt finally got something fire 🔥🙌🏼 Been needing this!',
		img: 'https://inspira-ui.com/images/x-logo.svg',
	},
]

// 定义Marquee配置
const marqueeConfigs = [
	{
		transform: 'translateY(-11.5rem) rotate(-16deg)',
		reverse: false,
		extraClasses: 'hidden sm:flex',
		truncate: false,
	},
	{
		transform: 'translateY(1rem) rotate(-16deg)',
		reverse: true,
		extraClasses: '',
		truncate: true,
	},
	{
		transform: 'translateY(13.5rem) rotate(-16deg)',
		reverse: false,
		extraClasses: '',
		truncate: true,
	},
	{
		transform: 'translateY(26rem) rotate(-16deg)',
		reverse: true,
		extraClasses: 'hidden md:flex',
		truncate: false,
	},
]
</script>

<style scoped>
.marquee {
	--duration: 40s;
	position: absolute;
	left: -10%;
	width: 120%;
	padding: 0.5rem 0;
}

@media (max-width: 640px) {
	.marquee {
		--duration: 30s; /* 在移动设备上更快的滚动速度 */
	}
}
</style>
