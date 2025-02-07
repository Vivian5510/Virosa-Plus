<template>
	<section
		id="Article"
		class="mb-50 max-w-7xl flex flex-col items-center justify-center"
	>
		<BlurReveal :delay="0" :duration="1.5">
			<div
				class="max-w-7xl w-full flex flex-col items-center justify-center p-4"
			>
				<div class="py-5 text-5xl font-semibold">
					Reflections on Life's Lessons <span class="text-4xl"> ❤️</span>
				</div>
				<div
					class="text-center text-3xl text-black font-semibold dark:text-white"
				>
					"In the quiet hum of life’s ebb and flow, I discover lessons hidden in
					the ordinary moments. Here, I share the whispers of my learning, a
					mosaic of thoughts, notes, and reflections from the paths I’ve
					walked."
				</div>
				<div
					class="dark:bg-background relative h-[430px] w-full overflow-hidden border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 shadow-lg dark:border-white/[0.2] dark:bg-black"
				>
					<!-- Logo -->
					<div
						class="absolute left-1/2 top-8 z-20 mt-4 border rounded-3xl bg-white/30 p-3 backdrop-blur-md -translate-x-1/2"
					>
						<img
							v-if="isDark"
							src="/logo-dark.svg"
							alt=""
							class="h-auto w-24"
						/>
						<img v-else src="/logo.svg" alt="" class="h-auto w-24" />
					</div>

					<!-- Center Text -->
					<div
						class="absolute inset-0 z-10 mt-20 flex flex-col items-center justify-center px-4 text-center"
					>
						<p class="m-4 text-base sm:text-lg">What are you waiting for?</p>
						<h3 class="mb-2 text-4xl font-bold sm:text-5xl">
							START READING AND LEARN MORE ABOUT ME 😄
						</h3>
						<InteractiveHoverButton
							class="w-56 border-black/[0.1] bg-gray-50 dark:border-white/[0.2] dark:bg-black"
							text="Get Started"
						/>
					</div>

					<!-- Tilted Marquees -->
					<div class="absolute inset-0 overflow-hidden">
						<Marquee
							:style="{ transform: 'translateY(-11.5rem) rotate(-16deg)' }"
							class="marquee"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in firstRow"
								:key="review.username"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
							/>
						</Marquee>

						<Marquee
							:style="{ transform: 'translateY(1rem) rotate(-16deg)' }"
							reverse
							class="marquee"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in firstRow"
								:key="review.username"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
							/>
						</Marquee>

						<Marquee
							:style="{ transform: 'translateY(13.5rem) rotate(-16deg)' }"
							class="marquee"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in firstRow"
								:key="review.username"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
							/>
						</Marquee>

						<Marquee
							:style="{ transform: 'translateY(26rem) rotate(-16deg)' }"
							reverse
							class="marquee"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in firstRow"
								:key="review.username"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
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
import Marquee from '~/components/inspira/card/marquee/Marquee.vue'
import ReviewCard from '~/components/inspira/card/marquee/ReviewCard.vue'
import InteractiveHoverButton from '~/components/inspira/button/InteractiveHoverButton.vue'
import BorderBeam from '~/components/inspira/special-effects/BorderBeam.vue'
import BlurReveal from '~/components/inspira/special-effects/BlurReveal.vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const reviews = [
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
		body: 'I’m actually obsessed 🥹💖 The aesthetics, the depth—everything!!',
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
		body: 'Yo, this is sick! 👀 Found it a few days ago & already hooked. Can’t wait to dive in!',
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

// Rows
const firstRow = ref(reviews)
</script>

<style scoped>
.marquee {
	--duration: 40s;
	position: absolute;
	left: -10%;
	width: 120%;
	padding: 0.5rem 0;
}
</style>
