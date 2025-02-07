<script setup lang="ts">
import { File, Folder, Tree } from '~/components/inspira/miscellaneous/FileTree'

definePage({
	alias: ['/article'],
})

import type { TreeViewElement } from '~/components/inspira/miscellaneous/FileTree'
import { isDark } from 'vue-dark-switch'
import CardSpotlight from '~/components/inspira/card/CardSpotlight.vue'
import BentoGrid from '~/components/inspira/miscellaneous/BentoGrid/BentoGrid.vue'
import BentoGridCard from '~/components/inspira/miscellaneous/BentoGrid/BentoGridCard.vue'
import CardItem from '~/components/inspira/card/3D-card/CardItem.vue'
import CardContainer from '~/components/inspira/card/3D-card/CardContainer.vue'
import BorderBeam from '~/components/inspira/special-effects/BorderBeam.vue'
import CardBody from '~/components/inspira/card/3D-card/CardBody.vue'
import Globe from '~/components/inspira/miscellaneous/Globe.vue'
import TextRevealCard from '~/components/inspira/text/TextRevealCard.vue'
import FlickeringGrid from '~/components/inspira/background/FlickeringGrid.vue'

const ELEMENTS: TreeViewElement[] = [
	{
		id: '1',
		isSelectable: true,
		name: 'root',
		children: [
			{
				id: '2',
				isSelectable: true,
				name: 'components',
				children: [
					{
						id: '3',
						isSelectable: true,
						name: 'ui',
						children: [
							{ id: '4', isSelectable: true, name: 'Button.vue' },
							{ id: '5', isSelectable: true, name: 'Card.vue' },
							{ id: '6', isSelectable: true, name: 'Input.vue' },
						],
					},
					{ id: '7', isSelectable: true, name: 'Header.vue' },
					{ id: '8', isSelectable: true, name: 'Footer.vue' },
				],
			},
			{
				id: '9',
				isSelectable: true,
				name: 'composables',
				children: [
					{ id: '10', isSelectable: false, name: 'useAuth.ts' },
					{ id: '11', isSelectable: true, name: 'useTheme.ts' },
				],
			},
			{
				id: '12',
				isSelectable: true,
				name: 'layouts',
				children: [
					{ id: '13', isSelectable: true, name: 'default.vue' },
					{ id: '14', isSelectable: false, name: 'auth.vue' },
				],
			},
			{
				id: '15',
				isSelectable: true,
				name: 'pages',
				children: [
					{ id: '16', isSelectable: true, name: 'index.vue' },
					{ id: '17', isSelectable: true, name: 'about.vue' },
					{
						id: '18',
						isSelectable: false,
						name: 'auth',
						children: [
							{ id: '19', isSelectable: true, name: 'login.vue' },
							{ id: '20', isSelectable: true, name: 'register.vue' },
						],
					},
				],
			},
			{ id: '21', isSelectable: true, name: 'app.vue' },
			{ id: '22', isSelectable: true, name: 'nuxt.config.ts' },
		],
	},
]

const features = [
	{
		name: 'Save your files',
		description: 'We automatically save your files as you type.',
		href: '/',
		image: 'picture/photo-gallery/63A25DD2F55569BFE018B7AFC38AB7BE (1).png',
		cta: 'Learn more',
		class: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
	},
	{
		name: 'Full text search',
		description: 'Search through all your files in one place.',
		href: '/',
		image: 'picture/photo-gallery/EE927FD49469C8E88031956DD0AEBA65 (1).png',
		cta: 'Learn more',
		class: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
	},
	{
		name: 'Multilingual',
		description: 'Supports 100+ languages and counting.',
		href: '/',
		cta: 'Learn more',
		class: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
	},
	{
		name: 'Calendar',
		description: 'Use the calendar to filter your files by date.',
		href: '/',
		cta: 'Learn more',
		class: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
	},
	{
		name: 'Notifications',
		description:
			'Get notified when someone shares a file or mentions you in a comment.',
		href: '/',
		image: 'picture/photo-gallery/ECC0DD1754CFE43E56CE98263785C00B (1).png',
		cta: 'Learn more',
		class: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
	},
	{
		name: 'Notifications',
		description:
			'Get notified when someone shares a file or mentions you in a comment.',
		href: '/',
		image: 'picture/photo-gallery/A3B8F0C85D390A8D96BD98AA89E8DD8A (1).png',
		cta: 'Learn more',
		class: 'lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-5',
	},
]
</script>

<template>
	<div>
		<div class="flex">
			<aside class="hidden h-screen w-70 p-4 md:block">
				<div
					class="relative size-fit flex flex-col items-center justify-center rounded-3xl"
				>
					<CardSpotlight
						class="h-fit w-60 flex-col cursor-pointer whitespace-nowrap border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black"
						:gradient-color="isDark ? '#363636' : '#C9C9C9'"
					>
						<Tree
							class="overflow-hidden rounded-md"
							:initial-selected-id="'1'"
							:initial-expanded-items="[
								'1',
								'2',
								'3',
								'4',
								'5',
								'6',
								'7',
								'8',
								'9',
								'10',
								'11',
								'12',
								'13',
								'14',
								'15',
								'16',
								'17',
								'18',
								'19',
							]"
							:elements="ELEMENTS"
						>
							<Folder id="1" name="root">
								<Folder id="2" name="components">
									<Folder id="3" name="ui">
										<File id="4" name="Button.vue" />
										<File id="5" name="Card.vue" />
										<File id="6" name="Input.vue" />
									</Folder>
									<File id="7" name="Header.vue" />
									<File id="8" name="Footer.vue" />
								</Folder>
								<Folder id="9" name="composables">
									<File id="10" name="useAuth.ts" :is-selectable="false" />
									<File id="11" name="useTheme.ts" />
								</Folder>
								<Folder id="12" name="layouts">
									<File id="13" name="default.vue" />
									<File id="14" name="auth.vue" :is-selectable="false" />
								</Folder>
								<Folder id="15" name="pages">
									<File id="16" name="index.vue" />
									<File id="17" name="about.vue" />
									<Folder id="18" name="auth" :is-selectable="false">
										<File id="19" name="login.vue" />
										<File id="20" name="register.vue" />
									</Folder>
								</Folder>
								<File id="21" name="app.vue" />
								<File id="22" name="nuxt.config.ts" />
							</Folder>
						</Tree>
					</CardSpotlight>
				</div>
			</aside>
			<main class="h-fit w-250 flex flex-col gap-2 p-4">
				<BentoGrid
					class="grid auto-rows-[22rem] grid-cols-3 w-full gap-4 lg:grid-rows-4"
				>
					<BentoGridCard
						v-for="(feature, index) in features"
						:key="index"
						v-bind="feature"
						:class="feature.class"
					>
						<template v-if="feature.image" #background>
							<div
								class="absolute right-0 top-0 size-full bg-center opacity-60 transition duration-150 ease-in-out group-hover:opacity-20"
								:style="`background-image: url('${feature.image}')`"
							></div>
						</template>
					</BentoGridCard>
				</BentoGrid>

				<div
					class="bg-background relative z-10 mt-15 h-fit w-full flex flex-col items-center justify-center overflow-hidden border border-black/[0.1] rounded-lg bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black md:shadow-xl"
				>
					<div :class="isDark ? 'dark' : ''">
						<div class="text-center">
							<h1
								class="text-3xl text-purple-400 font-bold dark:text-purple-300"
							>
								阅读激励实验 · 交互站点
							</h1>
							<p class="mt-4 text-xl text-gray-800 dark:text-gray-300">
								📖 你正接近一片未标记的文本领域 ——
								此处的字句尚未被完全解读，它们仍在寻找宿主。
							</p>
						</div>

						<div class="mt-8">
							<h2
								class="text-2xl text-blue-300 font-semibold dark:text-blue-400"
							>
								🜲 阅读探险者协议
							</h2>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								「欢迎加入这场文字远征，进入前请确认装备：」
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>信息耐受力 —— 防止被过量思考淹没</li>
								<li>逻辑弹性装置 —— 应对突如其来的意义偏折</li>
								<li>幽默感缓冲层 —— 用于吸收文本中的高能隐喻</li>
							</ul>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								⚠ 注意：阅读过程中，可能触发以下状态变换
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>突然对某个旧概念产生全新理解</li>
								<li>误入作者未设防的思维巷道</li>
								<li>发现一行文字比你先看穿了自己</li>
							</ul>
						</div>

						<div class="mt-8">
							<h2
								class="text-2xl text-blue-300 font-semibold dark:text-blue-400"
							>
								🜲 交互式阅读咒语
							</h2>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>点击 = 点燃文字火种</li>
								<li>滚轮滑动 = 进入节奏共振</li>
								<li>按下 Ctrl+S = 存档你的顿悟瞬间</li>
							</ul>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								🪐 每个段落都是可能性的折叠点，它们可以是指引，也可以是岔路。
							</p>
						</div>

						<div class="mt-8">
							<h2
								class="text-2xl text-blue-300 font-semibold dark:text-blue-400"
							>
								🜲 认知拓展彩蛋
							</h2>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								当你的视线抵达页面底部，你将解锁：
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>一份作者藏匿的“阅读副作用”清单</li>
								<li>某段被删改七次的自我辩解</li>
								<li>以及一个等待填充的 _______</li>
							</ul>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								📌 阅读不是单向吸收，而是一次创造，
								每个眼神的停留，都在重构这组字符的意义。
							</p>
						</div>

						<div class="mt-8">
							<h2 class="text-2xl text-red-300 font-semibold dark:text-red-400">
								🍫 阅读结算 · 可能性分布
							</h2>
							<p class="mt-4 text-gray-800 dark:text-gray-300">
								「此刻，你可以选择：」
							</p>
							<ul class="mt-4 list-disc pl-6 text-gray-800 dark:text-gray-300">
								<li>🔹 [89%] 关闭页面，如合上一本异次元手册</li>
								<li>🔹 [9.7%] 在留言区投递一颗未解的思维子弹</li>
								<li>🔹 [1.3%] 在现实世界发现这段文字的回声</li>
							</ul>
						</div>

						<div class="mt-8 text-center">
							<p class="text-lg text-gray-800 font-semibold dark:text-gray-400">
								🌀
								无论选择哪条路径，愿这些字符在你的突触间生长出意料之外的神经连接。
							</p>
						</div>
					</div>

					<FlickeringGrid
						class="[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] absolute inset-0 -z-10"
						:square-size="4"
						:grid-gap="6"
						color="#60A5FA"
						:max-opacity="0.5"
						:flicker-chance="0.1"
						:width="1000"
						:height="1000"
					/>
				</div>
			</main>
			<aside class="hidden h-screen w-80 p-4 md:block">
				<div
					class="relative mt-4 size-fit flex flex-col items-center justify-center rounded-3xl"
				>
					<CardContainer>
						<CardBody
							class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
						>
							<CardItem
								:translate-z="25"
								class="mb-2 min-w-60 w-full flex flex-col"
							>
								<TextRevealCard class="mx-auto">
									<template #header>
										<h2 class="mb-2 text-lg text-white font-semibold">
											Rosy once said about 📖
										</h2>
									</template>
									<template #text>
										<p
											class="bg-[#d5d0d0] bg-clip-text py-4 text-sm text-transparent font-bold md:py-10 sm:py-6 md:text-xl sm:text-xl"
										>
											“翻开书页，灵魂便可徜徉千重世界；然逃避文字者，唯能踽踽独行一途。”
										</p>
									</template>
									<template #revealText>
										<p
											:style="{
												textShadow: '4px 4px 15px rgba(0,0,0,0.5)',
											}"
											class="from-white to-neutral-300 bg-gradient-to-b bg-clip-text py-4 text-sm text-white font-bold md:py-10 sm:py-6"
										>
											"Through the pages of a book, a soul may wander a thousand
											worlds; but he who shuns the written word walks but a
											single path."
										</p>
									</template>
								</TextRevealCard>
							</CardItem>
						</CardBody>
					</CardContainer>
					<BorderBeam :size="250" :duration="7" :delay="12" :border-width="4" />
				</div>

				<div
					class="relative mt-6 size-fit flex flex-col items-center justify-center rounded-3xl"
				>
					<CardContainer>
						<CardBody
							class="group/card h-fit w-full gap-2 overflow-hidden border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
						>
							<CardItem :translate-z="25" class="w-full flex">
								<span
									class="pointer-events-none whitespace-pre-wrap from-black to-gray-300/80 bg-gradient-to-b bg-clip-text text-center text-8xl text-transparent font-semibold leading-none dark:from-white dark:to-slate-900/10 max-lg:-mt-12"
								>
									Read
								</span>
							</CardItem>

							<CardItem
								:translate-z="25"
								class="mt-3 min-h-28 min-w-60 w-full flex"
							>
								<Globe />
							</CardItem>
						</CardBody>
					</CardContainer>
					<BorderBeam
						:size="250"
						:duration="12"
						:delay="17"
						:border-width="2"
					/>
				</div>
			</aside>
		</div>
	</div>
</template>

<style scoped></style>
