<template>
	<div>
		<div class="flex">
			<!-- 侧边栏 -->
			<aside class="hidden h-screen w-80 p-4 md:block">
				<div
					class="relative size-fit flex flex-col items-center justify-center rounded-3xl"
				>
					<CardContainer>
						<CardBody
							class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
						>
							<CardItem
								:translate-z="25"
								class="mb-2 min-h-28 min-w-60 w-full flex flex-row items-center justify-center"
							>
								<AnimatedTooltip :items="people" />
							</CardItem>

							<CardItem
								as="p"
								translate-z="25"
								class="mt-2 max-w-sm text-center text-sm text-neutral-500 dark:text-neutral-300"
							>
								This is the realm where my presence weaves through the web. 🌿
							</CardItem>

							<CardItem class="w-full flex flex-col gap-4">
								<BlurReveal :delay="0.2" :duration="0.75" class="p-8">
									<span
										class="mb-4 text-3xl tracking-tighter sm:text-3xl xl:text-4xl/none"
									>
										Perhaps...?
									</span>

									<span
										class="text-pretty text-xl tracking-tighter sm:text-xl xl:text-xl/none"
									>
										we can become kindred spirits 😭
									</span>
								</BlurReveal>
							</CardItem>
						</CardBody>
					</CardContainer>
					<BorderBeam :size="250" :duration="12" :delay="9" :border-width="2" />
				</div>

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
								<div class="flex flex-row items-center">
									<LocationIcon v-if="!isDark" class="h-6 w-6" />
									<LocationIconLight v-else class="h-6 w-6" />
									<span class="ml-2 text-xl tracking-tighter">
										China, Chengdu
									</span>
								</div>

								<div class="mt-4 flex flex-row items-center">
									<WorkIcon v-if="!isDark" class="h-6 w-6" />
									<WorkIconLight v-else class="h-6 w-6" />
									<span class="ml-2 text-xl tracking-tighter"> Student </span>
								</div>

								<div class="mt-4 flex flex-row items-center">
									<img src="/svg/Building.svg" class="h-6 w-6" />
									<span class="bold ml-2 tracking-tighter">
										Southwest Jiaotong University
									</span>
								</div>
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
							class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
						>
							<CardItem :translate-z="25" class="min-w-60 w-full flex">
								<RadiantText
									class="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
									:duration="5"
								>
									<span class="text-center text-xl font-bold"
										>Tags for myself 😎</span
									>
								</RadiantText>
							</CardItem>

							<CardItem
								:translate-z="25"
								class="mt-3 min-h-28 min-w-60 w-full flex"
							>
								<div class="grid grid-cols-3 gap-2">
									<RippleButton
										v-for="(item, index) in buttonLabels"
										:key="index"
										class="font-black"
									>
										{{ item }}
									</RippleButton>
								</div>
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

				<div
					class="relative mt-6 size-fit flex flex-col items-center justify-center rounded-3xl"
				>
					<CardContainer>
						<CardBody
							class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
						>
							<CardItem :translate-z="25" class="min-w-60 w-full flex">
								<RadiantText
									class="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
									:duration="5"
								>
									<span class="text-center text-xl font-bold"
										>Guess how I'm feeling!</span
									>
								</RadiantText>
							</CardItem>

							<CardItem
								:translate-z="25"
								class="mt-3 min-h-28 min-w-60 w-full flex"
							>
								<ScratchToReveal
									:width="250"
									:height="250"
									:min-scratch-percentage="50"
									class="mx-auto flex items-center justify-center overflow-hidden border-2 rounded-2xl bg-gray-100"
									:gradient-colors="['#A97CF8', '#F38CB8', '#FDCC92']"
									@complete="handleComplete"
								>
									<div class="text-8xl">{{ randomEmoji }}</div>
								</ScratchToReveal>
							</CardItem>
						</CardBody>
					</CardContainer>
					<BorderBeam :size="250" :duration="20" :delay="5" :border-width="2" />
				</div>
			</aside>

			<!-- 主内容区域 -->
			<main class="p-8">
				<div
					class="h-56 w-full flex flex-col items-center justify-center gap-2"
				>
					<h1
						class="text-balance text-8xl font-extrabold leading-none tracking-tighter"
					>
						Hello,<br />
						I'm
						<LineShadowText
							class="text-center italic"
							:shadow-color="shadowColor"
						>
							Rosy
						</LineShadowText>
					</h1>
				</div>
				<img v-if="isDark" src="/svg/snake-Dark.svg" />
				<img v-if="!isDark" src="/svg/snake-Light.svg" />
				<h1 class="mt-8 text-4xl font-bold">
					<HyperText text="Intro" :duration="800" />
				</h1>
				<p class="">
					<LetterPullup
						words="“白天是键盘侠，晚上是梦境探险家，周末是咖啡因依赖症患者。”"
						:delay="0.05"
						class="text-black dark:text-white"
					/>
				</p>

				<div
					class="mx-auto max-w-3xl rounded-xl bg-gray-900 p-6 text-gray-200 shadow-lg space-y-8"
				>
					<h1 class="text-center text-3xl text-purple-400 font-bold">
						Who Am I | 废墟上的代码诗人
					</h1>

					<div class="space-y-4">
						<h2 class="text-xl text-blue-300 font-semibold">官方认证身份：</h2>
						<ul class="list-disc pl-6 space-y-1">
							<li>
								✖️ 一个（想要成为—好吧其实还在装模作样敲键盘的）后端开发者
							</li>
							<li>
								✓ 一个在代码废墟里种玫瑰的园艺师（用 Vue 浇水，用 Java 施肥）
							</li>
							<li>✓ 一个试图把人生 bug 写成十四行诗的浪漫主义码农</li>
							<li>✓ 白日梦想家兼夜间 emo 战士（工作时区：UTC+咖啡因）</li>
						</ul>
					</div>

					<div class="space-y-4">
						<h2 class="text-xl text-blue-300 font-semibold">隐秘版本：</h2>
						<ul class="list-disc pl-6 space-y-1">
							<li>三流哲学家，擅长在编译报错时思考存在主义</li>
							<li>二流生活家，能在泡面里吃出米其林幻觉</li>
							<li>
								超一流废墟收藏家（存放着2013年的TODO清单和2024年的过期理想）
							</li>
						</ul>
					</div>

					<p class="text-center text-lg text-pink-400 font-semibold">
						但无论如何，我是 Rosy，这个博客的主人，再次欢迎。
					</p>

					<h2 class="text-center text-3xl text-yellow-300 font-bold">
						Why Virosa | 为何建造这座数字巴别塔
					</h2>

					<div class="space-y-6">
						<div>
							<h3 class="text-lg text-green-400 font-semibold">
								原因一：对抗记忆蒸发术
							</h3>
							<p class="text-gray-300">
								我的大脑像一台内存不足的老式收音机——
								那些突如其来的灵光，比流星雨消失得还快。
								曾以为自己是尼采转世，结果连早餐吃了什么都得靠手机相册考古。
								于是决定：把思想切片腌渍在这个电子罐子里， 等八十岁时下酒。
							</p>
						</div>

						<div>
							<h3 class="text-lg text-green-400 font-semibold">
								原因二：修建情绪防波堤
							</h3>
							<p class="text-gray-300">
								朋友圈是当代楚门秀，QQ空间像过期罐头。
								而这里是我私人的诺亚方舟——存放着：
							</p>
							<ul class="list-disc pl-6 text-gray-300 space-y-1">
								<li>凌晨三点的量子纠缠式 emo</li>
								<li>被甲方谋杀的第108个创意残骸</li>
								<li>
									以及一次日落时突然领悟的宇宙真理（后来发现只是咖啡因戒断反应）
								</li>
							</ul>
						</div>

						<div>
							<h3 class="text-lg text-green-400 font-semibold">
								原因三：实施笔记永动计划
							</h3>
							<p class="text-gray-300">
								从小坚信
								"聪明人不需要笔记"，直到发现自己的记忆力堪比金鱼（七秒后："我刚才想说什么来着？"）。
								现在把笔记刻在区块链...不，存在博客里，
								至少不会被妈妈当废纸卖掉。
							</p>
						</div>
					</div>

					<h2 class="text-center text-3xl text-red-300 font-bold">
						How to Navigate | 生存指南
					</h2>

					<p class="text-center text-gray-300">
						⚠️ 警告：本馆展品包含
						<br />· 不定期爆发的代码瘟疫 <br />· 哲学性废话增生体 <br />·
						以及过量比喻修辞（可能引发晕眩）
					</p>

					<p class="text-center text-gray-300">
						推荐动线：
						<br />1️⃣ 先去
						<span class="underline">[灵感坟场]</span> 瞻仰我的半成品脑洞
						<br />2️⃣ 到
						<span class="underline">[情绪水族馆]</span> 围观金鱼脑的七秒记忆循环
						<br />3️⃣ 最后在
						<span class="underline">[真理垃圾站]</span>
						参与形而上学辩论（提供免费虚拟防毒面具）
					</p>

					<h2 class="text-center text-2xl text-blue-300 font-bold">终极坦白</h2>

					<p class="text-gray-300">
						其实建博客和买健身卡同理——付钱那刻就完成了最高成就。
						但万一这次我能坚持到写出比
						<span class="text-lg text-yellow-400 font-sans">"Hello World"</span>
						更伟大的作品呢？
					</p>

					<p class="text-center text-lg text-gray-400 font-semibold">
						P.S. 如果遇见卡在死循环里的我，请投喂
						<span class="text-pink-400">巧克力</span> 或
						<span class="text-blue-400">冷笑话</span> 🍫😂
					</p>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import CardContainer from '~/components/inspira/card/3D-card/CardContainer.vue'
import CardBody from '~/components/inspira/card/3D-card/CardBody.vue'
import CardItem from '~/components/inspira/card/3D-card/CardItem.vue'
import BorderBeam from '~/components/inspira/special-effects/BorderBeam.vue'
import AnimatedTooltip from '~/components/inspira/miscellaneous/AnimatedTooltip.vue'
import BlurReveal from '~/components/inspira/special-effects/BlurReveal.vue'
import LocationIcon from '~/components/common/icons/LocationIcon.vue'
import WorkIcon from '~/components/common/icons/WorkIcon.vue'
import WorkIconLight from '~/components/common/icons/WorkIconLight.vue'
import LocationIconLight from '~/components/common/icons/LocationIconLight.vue'
import RippleButton from '~/components/inspira/button/RippleButton.vue'
import RadiantText from '~/components/inspira/text/RadiantText.vue'
import ScratchToReveal from '~/components/inspira/miscellaneous/ScratchToReveal.vue'
import LineShadowText from '~/components/inspira/text/LineShadowText.vue'
import { isDark } from 'vue-dark-switch'
import HyperText from '~/components/inspira/text/HyperText.vue'
import LetterPullup from '~/components/inspira/text/LetterPullup.vue'

const shadowColor = computed(() => (isDark.value ? 'white' : 'black'))

const people = [
	{
		id: 1,
		name: 'Vivian9950',
		designation: 'Github',
		image: 'picture/avatar/Github-Avatar.png',
	},
	{
		id: 2,
		name: 'Hygge_inG',
		designation: 'Bilibili',
		image: 'picture/avatar/Bilibili-Avatar.png',
	},
	{
		id: 3,
		name: 'Rosy',
		designation: 'QQ',
		image: 'picture/avatar/QQ-Avatar.png',
	},
	{
		id: 4,
		name: '恺',
		designation: 'Weixin',
		image: 'picture/avatar/WX-Avatar.png',
	},
]
const buttonLabels = [
	'Coding',
	'Delicious',
	'College',
	'Gamer',
	'Java',
	'Smile',
	'AI',
	'C++',
	'Algorithm',
	'Backend',
	'AI',
	'Math',
]

const emojiList = [
	'😀',
	'😁',
	'😂',
	'🤣',
	'😃',
	'😄',
	'😅',
	'😆',
	'😇',
	'😈',
	'😉',
	'😊',
	'😋',
	'😌',
	'😍',
	'😎',
	'😏',
	'😐',
	'😑',
	'😒',
	'😔',
	'😕',
	'😖',
	'😗',
	'😘',
	'😙',
	'😚',
	'😛',
	'😜',
	'😝',
	'😞',
	'😟',
	'😠',
	'😡',
	'😢',
	'😣',
	'😥',
	'😦',
	'😧',
	'😨',
	'😩',
	'😪',
	'😫',
	'😬',
	'😭',
	'😮',
	'😯',
	'😰',
	'😱',
	'😳',
	'😴',
	'😵',
	'😶',
	'😷',
	'😸',
	'😹',
	'😺',
	'😻',
	'😼',
	'😽',
	'🙀',
	'🙀',
	'🙁',
	'🙂',
	'🙃',
	'🙄',
	'😏',
	'😇',
]
const randomEmoji = ref(emojiList[Math.floor(Math.random() * emojiList.length)])

function handleComplete() {
	// when scratch is completed do something
}
</script>

<style scoped></style>
