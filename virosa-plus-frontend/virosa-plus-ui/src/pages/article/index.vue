<script setup lang="ts">
import { File, Folder, Tree } from '~/components/inspira/miscellaneous/FileTree'
import Prism from 'markdown-it-prism'
import MarkdownIt from 'markdown-it'

definePage({
	alias: ['/article'],
})

import type { TreeViewElement } from '~/components/inspira/miscellaneous/FileTree'
import { isDark } from 'vue-dark-switch'
import CardSpotlight from '~/components/inspira/card/CardSpotlight.vue'
import BentoGrid from '~/components/inspira/miscellaneous/BentoGrid/BentoGrid.vue'
import BentoGridCard from '~/components/inspira/miscellaneous/BentoGrid/BentoGridCard.vue'

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
		image:
			'https://images.pexels.com/photos/2762083/pexels-photo-2762083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		cta: 'Learn more',
		class: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
	},
	{
		name: 'Full text search',
		description: 'Search through all your files in one place.',
		href: '/',
		image:
			'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
		image:
			'https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		cta: 'Learn more',
		class: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
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
			<main class="h-fit w-250 flex gap-2 p-4">
				<BentoGrid
					class="grid auto-rows-[22rem] grid-cols-3 w-full gap-4 lg:grid-rows-3"
				>
					<BentoGridCard
						v-for="(feature, index) in features"
						:key="index"
						v-bind="feature"
						:class="feature.class"
					>
						<template v-if="feature.image" #background>
							<div
								class="absolute right-0 top-0 size-full bg-center opacity-40 transition duration-150 ease-in-out group-hover:opacity-20"
								:style="`background-image: url('${feature.image}')`"
							></div>
						</template>
					</BentoGridCard>
				</BentoGrid>
			</main>
			<aside class="hidden h-screen w-80 p-4 md:block">
				<div
					class="relative size-fit flex flex-col items-center justify-center rounded-3xl"
				>
					<CardSpotlight
						class="h-fit w-full flex-col cursor-pointer items-center justify-center whitespace-nowrap border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black"
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
		</div>
	</div>
</template>

<style scoped></style>
