<script setup lang="ts">
import AnimatedList from '~/components/inspira/miscellaneous/AnimatedList/AnimatedList.vue'
import Notification from '~/components/inspira/miscellaneous/AnimatedList/Notification.vue'
import BoxReveal from '~/components/inspira/text/BoxReveal.vue'
import VanishingInput from '~/components/inspira/miscellaneous/VanishingInput.vue'

const notifications = [
	{
		name: '🐞 Bug 反馈',
		description: '发现了一个影响使用的问题，需要修复。',
		time: '15m ago',
		icon: '🐞',
		color: '#FF3D71',
	},
	{
		name: '✨ 新功能请求',
		description: '希望添加一个更好用的新功能，让体验更棒。',
		time: '10m ago',
		icon: '✨',
		color: '#00B800',
	},
	{
		name: '📖 文档改进',
		description: '某些部分的文档不够详细，可能会让新手困惑。',
		time: '5m ago',
		icon: '📖',
		color: '#1E86FF',
	},
	{
		name: '🎨 UI/UX 优化',
		description: '界面设计或交互体验可以改进，提供更流畅的使用感。',
		time: '2m ago',
		icon: '🎨',
		color: '#00C9A7',
	},
	{
		name: '⚡ 性能问题',
		description: '遇到了页面加载慢、卡顿或者响应不及时的问题。',
		time: '1m ago',
		icon: '⚡',
		color: '#45B26B',
	},
	{
		name: '🔍 代码优化建议',
		description: '发现了一些可以优化的代码，能提升可读性和效率。',
		time: '30m ago',
		icon: '🔍',
		color: '#008080',
	},
	{
		name: '💡 灵感/建议',
		description: '这里有个有趣的想法，可能会让项目更特别！',
		time: '1h ago',
		icon: '💡',
		color: '#F9A825',
	},
	{
		name: '📢 反馈 & 吐槽',
		description: '对项目或作者有什么话想说？好的坏的都可以！',
		time: '2h ago',
		icon: '📢',
		color: '#FF5722',
	},
	{
		name: '☕ 邀请作者喝咖啡',
		description: '喜欢这个项目，想给作者一点鼓励和支持！',
		time: '3h ago',
		icon: '☕',
		color: '#795548',
	},
	{
		name: '🚀 其他',
		description: '任何不在上述分类里的内容，都可以放这里。',
		time: '4h ago',
		icon: '🚀',
		color: '#673AB7',
	},
]

const placeholders = [
	'Why is my code always broken?',
	"What does 'undefined' even mean?",
	'How to center a div (for real this time)',
	'Am I smarter than a compiler?',
	'Do loops ever get dizzy?',
]
const text = ref('')
</script>

<template>
	<div class="flex">
		<main class="w-165 flex flex-col p-4">
			<div class="w-full items-center justify-center overflow-hidden p-8">
				<BoxReveal color="#E1251B">
					<p class="text-[3.5rem] font-semibold">
						Ask Anything Silly
						<span class="text-[#E1251B]">。</span>
					</p>
				</BoxReveal>

				<BoxReveal color="#E1251B" :duration="0.8">
					<h2 class="mt-[.5rem] text-[1rem]">
						有关于我或者网站的问题？告诉我！
					</h2>
				</BoxReveal>

				<BoxReveal color="#E1251B" :duration="1">
					<div class="mt-6">
						<p>
							<span class="text-[#E1251B] font-semibold"> → </span>
							如果是关于网站的问题，请
							<span class="text-[#E1251B] font-semibold">
								描述清楚您遇到的问题或想要的功能
							</span>
							，我会尽快处理。<br />
							<span class="text-[#E1251B] font-semibold"> → </span>
							如果是关于Rosy的问题并且比
							<span class="text-[#E1251B] font-semibold">
								较隐私不方便展示
							</span>
							，可以考虑给我发
							<span class="text-[#E1251B] font-semibold"> 邮件 </span>
							哦。 <br />
							<span class="text-[#E1251B] font-semibold"> → </span>
							如果方便的话，可以在
							<span class="text-[#E1251B] font-semibold">
								Github开启Issue
							</span>
							。<br />
							<span class="text-[#E1251B] font-semibold"> → </span>
							无论是 bug 报告、功能建议，还是其他关于Rosy的问题，
							<span class="text-[#E1251B] font-semibold">
								都会得到认真对待
							</span>
							。<br />
						</p>
					</div>
				</BoxReveal>
			</div>
			<VanishingInput
				v-model="text"
				:placeholders="placeholders"
				class="mt-5"
			/>
		</main>

		<aside class="hidden h-screen w-150 p-4 md:block">
			<div class="relative h-[720px] w-full flex flex-col overflow-hidden p-6">
				<AnimatedList>
					<template #default>
						<Notification
							v-for="(item, idx) in notifications"
							:key="idx"
							:name="item.name"
							:description="item.description"
							:icon="item.icon"
							:color="item.color"
							:time="item.time"
						/>
					</template>
				</AnimatedList>
			</div>
		</aside>
	</div>
</template>

<style scoped></style>
