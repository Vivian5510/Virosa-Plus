<script setup lang="ts">
import PhotoGallery from '~/components/inspira/miscellaneous/PhotoGallery.vue'
import BlurReveal from '~/components/inspira/special-effects/BlurReveal.vue'
import { ORBIT_DIRECTION } from '~/components/inspira/miscellaneous/orbit'
import FallingStarsBg from '~/components/inspira/background/FallingStarsBg.vue'
import { isDark } from 'vue-dark-switch'
import BorderBeam from '~/components/inspira/special-effects/BorderBeam.vue'
import IconCloud from '~/components/inspira/miscellaneous/IconCloud/IconCloud.vue'
import Orbit from '~/components/inspira/miscellaneous/orbit/Orbit.vue'

const galleryItems = [
	{
		src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		src: 'picture/photo-gallery/VCG211313809225.jpg',
	},
	{
		src: 'picture/photo-gallery/VCG211508537811.png',
	},
	{
		src: 'picture/photo-gallery/VCG211514957426.jpg',
	},
	{
		src: 'picture/photo-gallery/VCG211424736516.jpg',
	},
	{
		src: 'picture/photo-gallery/VCG211383857965.jpg',
	},
]

const slugs = [
	'apache-original',
	'apachekafka-original',
	'apple-original',
	'astro-original',
	'atom-original',
	'axios-plain',
	'azure-original',
	'babel-original',
	'bash-original',
	'bun-original',
	'c-original',
	'canva-original',
	'chrome-original',
	'cplusplus-original',
	'css3-original',
	'debian-original',
	'devicon-original',
	'django-plain',
	'docker-original',
	'dot-net-original',
	'elasticsearch-original',
	'electron-original',
	'elixir-original',
	'ghost-original',
	'git-original',
	'github-original',
	'google-original',
	'html5-original',
	'less-plain-wordmark',
	'lua-original',
]

// const imageUrls = slugs.map(
// 	(slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
// )
const imageUrls = slugs.map((slug) => `/svg/${slug}.svg`)
</script>

<template>
	<section
		id="Recreation"
		class="mb-50 max-w-7xl flex flex-col items-center justify-center"
	>
		<BlurReveal :delay="0" :duration="1.5">
			<div class="mb-10 text-center text-4xl font-semibold">
				Admire some breathtaking landscapes to uplift your mood.
			</div>
			<div class="flex items-center justify-center">
				<PhotoGallery :items="galleryItems" />
			</div>
		</BlurReveal>

		<div
			class="bg-background relative z-10 mt-36 h-[800px] w-full flex flex-col items-center justify-center overflow-hidden border border-black/[0.1] rounded-lg bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black md:shadow-xl"
		>
			<FallingStarsBg
				class="bg-white -z-1 dark:bg-black"
				:color="isDark ? '#FFF' : '#555'"
			/>

			<BlurReveal :delay="0" :duration="1.5">
				<div class="grid place-content-center p-6">
					<IconCloud :images="imageUrls" />
				</div>
			</BlurReveal>

			<Orbit
				class="size-[30px] items-center justify-center border-none bg-transparent"
				:duration="20"
				:delay="20"
				:radius="190"
				:direction="ORBIT_DIRECTION.CounterClockwise"
			>
				<img src="/svg/maven-original.svg" alt="" />
			</Orbit>
			<Orbit
				class="size-[30px] items-center justify-center border-none bg-transparent"
				:duration="20"
				:delay="10"
				:radius="190"
				path
				:direction="ORBIT_DIRECTION.CounterClockwise"
			>
				<img src="/svg/prometheus-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="280"
				:duration="20"
				path
			>
			</Orbit>
			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="300"
				:duration="20"
				:delay="200"
				:direction="ORBIT_DIRECTION.CounterClockwise"
			>
				<img src="/svg/postman-original.svg" alt="" />
			</Orbit>
			<Orbit
				class="items-center justify-center border-none bg-transparent text-4xl"
				:radius="250"
				:delay="10"
			>
				<img src="/svg/nodejs-original-wordmark.svg" class="w-15" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="340"
				:duration="20"
				:delay="15"
				path
			>
				<img src="/svg/mongodb-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="190"
				:duration="22"
				:delay="20"
			>
				<img src="/svg/react-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="310"
				:duration="10"
				:delay="30"
			>
				<img src="/svg/swagger-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="300"
				:duration="26"
				:delay="23"
			>
				<img src="/svg/vitejs-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="325"
				:duration="29"
				:delay="27"
			>
				<img src="/svg/jenkins-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="280"
				:duration="5"
				:delay="0"
			>
				<img src="/svg/java-original.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="285"
				:duration="34"
				:delay="34"
			>
				<img src="/svg/less-plain-wordmark.svg" alt="" />
			</Orbit>

			<Orbit
				class="size-[50px] items-center justify-center border-none bg-transparent"
				:radius="250"
				:duration="10"
				:delay="37"
			>
				<img src="/svg/linux-original.svg" alt="" />
			</Orbit>

			<BorderBeam :size="250" :duration="12" :delay="9" :border-width="4" />
		</div>
	</section>
</template>

<style scoped></style>
