<template>
	<div>
		<!-- 窄屏招呼语 - 强制隐藏在大屏幕 -->
		<div class="mobile-greeting block p-6 text-center lg:hidden">
			<h1
				class="text-balance text-5xl font-extrabold leading-none tracking-tighter md:text-7xl sm:text-6xl"
			>
				Hello,<br />
				I'm
				<LineShadowText :shadow-color="shadowColor" class="text-center italic">
					Rosy
				</LineShadowText>
			</h1>
		</div>

		<div class="main-container flex flex-col lg:flex-row">
			<!-- 侧边栏 -->
			<aside class="sidebar h-auto w-full p-4 lg:h-screen lg:w-80">
				<!-- 卡片容器 - 窄屏居中显示 -->
				<div class="card-container mx-auto w-80 lg:mx-0 lg:w-auto">
					<div
						class="relative w-full flex flex-col items-center justify-center rounded-3xl"
					>
						<CardContainer class="w-full" style="width: 100% !important">
							<CardBody
								class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
								style="width: 100% !important; max-width: none !important"
							>
								<CardItem
									:translate-z="25"
									class="mb-2 min-h-20 w-full flex flex-row items-center justify-center sm:min-h-28"
								>
									<AnimatedTooltip :items="people" />
								</CardItem>

								<CardItem
									as="p"
									class="mt-2 w-full text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-300"
									translate-z="25"
								>
									This is the realm where my presence weaves through the web. 🌿
								</CardItem>

								<CardItem class="w-full flex flex-col gap-4">
									<BlurReveal :delay="0.2" :duration="0.75" class="p-4 sm:p-8">
										<span
											class="mb-2 text-2xl tracking-tighter sm:mb-4 sm:text-3xl xl:text-4xl/none"
										>
											Perhaps...?
										</span>

										<span
											class="text-pretty text-lg tracking-tighter sm:text-xl xl:text-xl/none"
										>
											we can become kindred spirits 😭
										</span>
									</BlurReveal>
								</CardItem>
							</CardBody>
						</CardContainer>
						<BorderBeam
							:border-width="2"
							:delay="9"
							:duration="12"
							:size="320"
						/>
					</div>

					<div
						class="relative mt-4 w-full flex flex-col items-center justify-center rounded-3xl"
					>
						<CardContainer class="w-full" style="width: 100% !important">
							<CardBody
								class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
								style="width: 100% !important; max-width: none !important"
							>
								<CardItem :translate-z="25" class="mb-2 w-full flex flex-col">
									<div class="flex flex-row items-center">
										<LocationIcon
											v-if="!isDark"
											class="h-5 w-5 sm:h-6 sm:w-6"
										/>
										<LocationIconLight v-else class="h-5 w-5 sm:h-6 sm:w-6" />
										<span class="ml-2 text-lg tracking-tighter sm:text-xl">
											China, Chengdu
										</span>
									</div>

									<div class="mt-3 flex flex-row items-center sm:mt-4">
										<WorkIcon v-if="!isDark" class="h-5 w-5 sm:h-6 sm:w-6" />
										<WorkIconLight v-else class="h-5 w-5 sm:h-6 sm:w-6" />
										<span class="ml-2 text-lg tracking-tighter sm:text-xl">
											Student
										</span>
									</div>

									<div class="mt-3 flex flex-row items-center sm:mt-4">
										<img
											class="h-5 w-5 sm:h-6 sm:w-6"
											src="/svg/Building.svg"
										/>
										<span
											class="bold ml-2 text-sm tracking-tighter sm:text-base"
										>
											Southwest Jiaotong University
										</span>
									</div>
								</CardItem>
							</CardBody>
						</CardContainer>
						<BorderBeam
							:border-width="4"
							:delay="12"
							:duration="7"
							:size="320"
						/>
					</div>

					<div
						class="relative mt-4 w-full flex flex-col items-center justify-center rounded-3xl sm:mt-6"
					>
						<CardContainer class="w-full" style="width: 100% !important">
							<CardBody
								class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
								style="width: 100% !important; max-width: none !important"
							>
								<CardItem :translate-z="25" class="w-full flex">
									<RadiantText
										:duration="5"
										class="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
									>
										<span class="text-center text-lg font-bold sm:text-xl"
											>Tags for myself 😎</span
										>
									</RadiantText>
								</CardItem>

								<CardItem
									:translate-z="25"
									class="mt-3 min-h-20 w-full flex justify-center sm:min-h-28"
								>
									<div
										class="grid grid-cols-2 w-full gap-1.5 sm:grid-cols-3 sm:gap-2"
									>
										<RippleButton
											v-for="(item, index) in buttonLabels"
											:key="index"
											class="min-h-8 w-full flex items-center justify-center text-xs font-black sm:text-sm"
										>
											{{ item }}
										</RippleButton>
									</div>
								</CardItem>
							</CardBody>
						</CardContainer>
						<BorderBeam
							:border-width="2"
							:delay="17"
							:duration="12"
							:size="250"
						/>
					</div>

					<div
						class="relative mt-4 w-full flex flex-col items-center justify-center rounded-3xl sm:mt-6"
					>
						<CardContainer class="w-full" style="width: 100% !important">
							<CardBody
								class="group/card h-fit w-full gap-2 border border-black/[0.1] rounded-xl bg-gray-50 px-4 py-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
								style="width: 100% !important; max-width: none !important"
							>
								<CardItem :translate-z="25" class="w-full flex">
									<RadiantText
										:duration="5"
										class="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
									>
										<span class="text-center text-lg font-bold sm:text-xl"
											>Guess how I'm feeling!</span
										>
									</RadiantText>
								</CardItem>

								<CardItem
									:translate-z="25"
									class="mt-3 min-h-20 w-full flex sm:min-h-28"
								>
									<ScratchToReveal
										:key="`scratch-${scratchWidth}-${scratchHeight}`"
										:gradient-colors="['#A97CF8', '#F38CB8', '#FDCC92']"
										:height="scratchHeight"
										:min-scratch-percentage="50"
										:width="scratchWidth"
										class="mx-auto flex items-center justify-center overflow-hidden border-2 rounded-2xl bg-gray-100"
										@complete="handleComplete"
									>
										<div :class="emojiClass">{{ randomEmoji }}</div>
									</ScratchToReveal>
								</CardItem>
							</CardBody>
						</CardContainer>
						<BorderBeam
							:border-width="2"
							:delay="5"
							:duration="20"
							:size="320"
						/>
					</div>
				</div>
				<!-- 关闭卡片容器 -->
			</aside>

			<!-- 主内容区域 - 强制只在大屏幕显示 -->
			<main class="main-content hidden overflow-y-auto p-4 lg:block lg:flex-1">
				<!-- 大屏幕招呼语 -->
				<div
					class="h-56 w-full flex flex-col items-center justify-center gap-2"
				>
					<h1
						class="text-center text-balance text-8xl font-extrabold leading-none tracking-tighter"
					>
						Hello,<br />
						I'm
						<LineShadowText
							:shadow-color="shadowColor"
							class="text-center italic"
						>
							Rosy
						</LineShadowText>
					</h1>
				</div>
				<div class="flex justify-center">
					<img
						:src="isDark ? '/svg/snake-Dark.svg' : '/svg/snake-Light.svg'"
						:alt="
							isDark
								? 'Dark mode snake animation'
								: 'Light mode snake animation'
						"
						class="h-auto max-w-full transition-opacity duration-300 will-change-auto"
						style="transform: translateZ(0)"
						loading="eager"
					/>
				</div>
				<h1 class="mt-6 text-2xl font-bold sm:mt-8 md:text-4xl sm:text-3xl">
					<HyperText :duration="800" text="Intro" />
				</h1>
				<p class="mb-6">
					<LetterPullup
						:delay="0.05"
						class="text-black dark:text-white"
						words="“白天是键盘侠，晚上是梦境探险家，周末是咖啡因依赖症患者。”"
					/>
				</p>

				<div
					class="mx-auto mt-8 max-w-4xl border border-gray-200/50 rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm sm:mt-12 space-y-8 dark:border-gray-700/50 dark:bg-gray-900/80"
				>
					<!-- 标题区域 -->
					<div
						class="border-b border-gray-200 pb-6 text-center dark:border-gray-700"
					>
						<h1
							class="mb-2 text-3xl text-gray-800 font-bold sm:text-4xl dark:text-gray-100"
						>
							Who Am I
						</h1>
						<p class="text-lg text-gray-600 font-medium dark:text-gray-400">
							废墟上的代码诗人
						</p>
					</div>

					<!-- 身份介绍 -->
					<div class="grid gap-6 md:grid-cols-2">
						<!-- 官方认证身份 -->
						<div class="space-y-4">
							<h2
								class="mb-4 text-xl text-gray-800 font-semibold dark:text-gray-200"
							>
								官方认证身份
							</h2>
							<div class="text-gray-700 space-y-3 dark:text-gray-300">
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-red-500">✖</span>
									<p>
										一个（想要成为—好吧其实还在装模作样敲键盘的）<strong
											>后端开发者</strong
										>
									</p>
								</div>
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-green-500">✓</span>
									<p>
										一个在代码废墟里种玫瑰的<strong>园艺师</strong>（用
										<span
											class="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700 font-medium dark:bg-green-900/30 dark:text-green-300"
											>Vue</span
										>
										浇水，用
										<span
											class="rounded bg-orange-100 px-2 py-0.5 text-sm text-orange-700 font-medium dark:bg-orange-900/30 dark:text-orange-300"
											>Java</span
										>
										施肥）
									</p>
								</div>
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-green-500">✓</span>
									<p>
										一个试图把人生
										<span
											class="rounded bg-red-100 px-2 py-0.5 text-sm text-red-700 font-medium dark:bg-red-900/30 dark:text-red-300"
											>bug</span
										>
										写成十四行诗的<strong>浪漫主义码农</strong>
									</p>
								</div>
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-green-500">✓</span>
									<p>
										<strong>白日梦想家</strong>兼<strong>夜间 emo 战士</strong
										>（工作时区：<span
											class="rounded bg-blue-100 px-2 py-0.5 text-sm text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-300"
											>UTC+咖啡因</span
										>）
									</p>
								</div>
							</div>
						</div>

						<!-- 隐秘版本 -->
						<div class="space-y-4">
							<h2
								class="mb-4 text-xl text-gray-800 font-semibold dark:text-gray-200"
							>
								隐秘版本
							</h2>
							<div class="text-gray-700 space-y-3 dark:text-gray-300">
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-gray-400">•</span>
									<p>
										<strong>三流哲学家</strong>，擅长在编译报错时思考存在主义
									</p>
								</div>
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-gray-400">•</span>
									<p><strong>二流生活家</strong>，能在泡面里吃出米其林幻觉</p>
								</div>
								<div class="flex items-start space-x-3">
									<span class="mt-1 text-gray-400">•</span>
									<p>
										<strong>超一流废墟收藏家</strong>（存放着<span
											class="text-sm text-gray-500"
											>2013年的TODO清单</span
										>和<span class="text-sm text-gray-500"
											>2024年的过期理想</span
										>）
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- 欢迎语 -->
					<div
						class="border-y border-gray-200 py-6 text-center dark:border-gray-700"
					>
						<p class="text-lg text-gray-700 dark:text-gray-300">
							但无论如何，我是
							<strong class="text-xl text-purple-600 dark:text-purple-400"
								>Rosy</strong
							>，这个博客的主人，再次欢迎。
						</p>
					</div>

					<!-- Why Virosa -->
					<div class="space-y-6">
						<h2
							class="text-center text-2xl text-gray-800 font-bold dark:text-gray-200"
						>
							Why Virosa | 为何建造这座数字巴别塔
						</h2>

						<div class="space-y-6">
							<div class="space-y-3">
								<h3
									class="text-lg text-gray-800 font-semibold dark:text-gray-200"
								>
									原因一：对抗记忆蒸发术
								</h3>
								<p class="text-gray-700 leading-relaxed dark:text-gray-300">
									我的大脑像一台<strong>内存不足的老式收音机</strong>——那些突如其来的灵光，比流星雨消失得还快。
									曾以为自己是尼采转世，结果连早餐吃了什么都得靠手机相册考古。
									于是决定：把思想切片腌渍在这个电子罐子里，等八十岁时下酒。
								</p>
							</div>

							<div class="space-y-3">
								<h3
									class="text-lg text-gray-800 font-semibold dark:text-gray-200"
								>
									原因二：修建情绪防波堤
								</h3>
								<p
									class="mb-3 text-gray-700 leading-relaxed dark:text-gray-300"
								>
									朋友圈是当代楚门秀，QQ空间像过期罐头。而这里是我私人的<strong>诺亚方舟</strong>——存放着：
								</p>
								<ul
									class="ml-4 list-disc list-inside text-gray-700 space-y-1 dark:text-gray-300"
								>
									<li>凌晨三点的量子纠缠式 emo</li>
									<li>被甲方谋杀的第108个创意残骸</li>
									<li>
										以及一次日落时突然领悟的宇宙真理（后来发现只是咖啡因戒断反应）
									</li>
								</ul>
							</div>

							<div class="space-y-3">
								<h3
									class="text-lg text-gray-800 font-semibold dark:text-gray-200"
								>
									原因三：实施笔记永动计划
								</h3>
								<p class="text-gray-700 leading-relaxed dark:text-gray-300">
									从小坚信<strong>"聪明人不需要笔记"</strong>，直到发现自己的记忆力堪比金鱼（七秒后："<em>我刚才想说什么来着？</em>"）。
									现在把笔记刻在
									<del>区块链</del>
									...不，存在博客里，至少不会被妈妈当废纸卖掉。
								</p>
							</div>
						</div>
					</div>

					<!-- How to Navigate -->
					<div class="space-y-6">
						<h2
							class="text-center text-2xl text-gray-800 font-bold dark:text-gray-200"
						>
							How to Navigate | 生存指南
						</h2>

						<div class="space-y-6">
							<div
								class="border-l-4 border-orange-400 rounded-lg bg-orange-50 p-6 dark:bg-orange-950/20"
							>
								<h3
									class="mb-3 text-lg text-orange-800 font-semibold dark:text-orange-300"
								>
									⚠️ 警告
								</h3>
								<p class="text-gray-700 dark:text-gray-300">
									本馆展品包含：不定期爆发的代码瘟疫、哲学性废话增生体、以及过量比喻修辞（可能引发晕眩）
								</p>
							</div>

							<div class="space-y-4">
								<h3
									class="text-lg text-gray-800 font-semibold dark:text-gray-200"
								>
									推荐动线
								</h3>
								<ol
									class="list-decimal list-inside text-gray-700 space-y-2 dark:text-gray-300"
								>
									<li>先去 <strong>[灵感坟场]</strong> 瞻仰我的半成品脑洞</li>
									<li>
										到 <strong>[情绪水族馆]</strong> 围观金鱼脑的七秒记忆循环
									</li>
									<li>
										最后在
										<strong>[真理垃圾站]</strong>
										参与形而上学辩论（提供免费虚拟防毒面具）
									</li>
								</ol>
							</div>

							<div
								class="rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-950/20"
							>
								<h3
									class="mb-3 text-lg text-blue-800 font-semibold dark:text-blue-300"
								>
									终极坦白
								</h3>
								<p class="mb-4 text-gray-700 dark:text-gray-300">
									其实建博客和买健身卡同理——付钱那刻就完成了最高成就。<br />
									但万一这次我能坚持到写出比
									<span
										class="rounded bg-yellow-100 px-2 py-0.5 text-yellow-700 font-medium dark:bg-yellow-900/30 dark:text-yellow-300"
										>"Hello World"</span
									>
									更伟大的作品呢？
								</p>
								<p class="text-gray-600 dark:text-gray-400">
									P.S. 如果遇见卡在死循环里的我，请投喂
									<strong>🍫 巧克力</strong> 或 <strong>😂 冷笑话</strong>
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script lang="ts" setup>
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

// 响应式窗口尺寸
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 768) // 获取真实窗口宽度或默认值

// 刮刮乐组件响应式尺寸
const scratchWidth = computed(() => {
	if (windowWidth.value < 640) return 180 // sm屏幕以下
	if (windowWidth.value < 768) return 200 // md屏幕以下
	return 250 // 大屏幕
})

const scratchHeight = computed(() => {
	if (windowWidth.value < 640) return 180 // sm屏幕以下
	if (windowWidth.value < 768) return 200 // md屏幕以下
	return 250 // 大屏幕
})

const emojiClass = computed(() => {
	if (windowWidth.value < 640) return 'text-5xl' // sm屏幕以下
	if (windowWidth.value < 768) return 'text-6xl' // md屏幕以下
	return 'text-8xl' // 大屏幕
})

// 预加载SVG图片
const preloadImages = () => {
	const images = ['/svg/snake-Dark.svg', '/svg/snake-Light.svg']
	images.forEach((src) => {
		const img = new Image()
		img.src = src
	})
}

// 监听窗口大小变化
onMounted(() => {
	// 预加载图片
	preloadImages()

	if (typeof window !== 'undefined') {
		windowWidth.value = window.innerWidth

		const handleResize = () => {
			windowWidth.value = window.innerWidth
		}

		window.addEventListener('resize', handleResize)

		onUnmounted(() => {
			window.removeEventListener('resize', handleResize)
		})
	}
})

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

<style scoped>
/* 强制确保响应式布局正确工作 */
@media (min-width: 1024px) {
  /* lg屏幕及以上 */
  .main-container {
    flex-direction: row !important;
  }
  
  .mobile-greeting {
    display: none !important;
  }
  
  .main-content {
    display: block !important;
  }
  
  .sidebar {
    height: 100vh !important;
    width: 20rem !important;
  }
  
  .card-container {
    width: auto !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}

@media (max-width: 1023px) {
  /* lg屏幕以下 */
  .main-container {
    flex-direction: column !important;
  }
  
  .mobile-greeting {
    display: block !important;
  }
  
  .main-content {
    display: none !important;
  }
}
</style>
