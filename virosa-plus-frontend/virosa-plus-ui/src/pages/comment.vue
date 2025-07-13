<template>
	<section>
		<!-- 侧边栏 -->
		<div class="flex">
			<!-- Closing tag added correctly here -->

			<!-- 主内容区域 -->
			<main
				class="px-4 py-6 lg:px-12 lg:py-16 md:px-8 md:py-12 sm:px-6 sm:py-8"
			>
				<div
					class="relative mt-8 max-w-full min-h-screen flex flex-col items-center justify-center gap-4 lg:mt-16 md:mt-12 sm:mt-10 md:gap-8 sm:gap-6"
				>
					<div
						class="flex flex-row items-center justify-center gap-2 text-center text-lg font-bold font-sans 2xl:text-7xl lg:text-5xl md:text-4xl sm:text-2xl xl:text-6xl"
					>
						<ColourfulText text="Leave Your Message" />
					</div>
					<div
						class="w-full flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4 md:px-8 sm:px-6"
					>
						<IInput
							id="inputDemo"
							v-model="comment.content"
							placeholder="Just Say"
							container-class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
						></IInput>
						<ShimmerButton
							class="min-w-16 h-10 px-4 shadow-2xl sm:min-w-20 sm:h-12 sm:px-6"
							shimmer-size="2px"
							@click="send"
						>
							<span
								class="whitespace-pre-wrap text-center text-sm text-white font-medium leading-none tracking-tight dark:from-white dark:to-slate-900/10 sm:text-base"
							>
								Send
							</span>
						</ShimmerButton>
					</div>
				</div>

				<!-- Tilted Marquees -->
				<div class="absolute inset-0 overflow-hidden -z-2">
					<!-- 上部分 -->
					<div class="space-y-3 md:space-y-6 sm:space-y-4">
						<Marquee class="marquee marquee-top-1" :pause-on-hover="false">
							<ReviewCard
								v-for="review in firstRow"
								:key="review.id"
								:img="review.avatar"
								:name="review.name"
								:username="review.username"
								:body="review.content"
							/>
						</Marquee>

						<Marquee
							reverse
							class="marquee marquee-top-2"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in firstRow"
								:key="review.id"
								:img="review.avatar"
								:name="review.name"
								:username="review.username"
								:body="review.content"
							/>
						</Marquee>
					</div>

					<!-- 中间空隙 -->
					<div class="h-20 lg:h-50 md:h-40 sm:h-32"></div>

					<!-- 下部分 -->
					<div class="space-y-3 md:space-y-6 sm:space-y-4">
						<Marquee class="marquee marquee-bottom-1" :pause-on-hover="false">
							<ReviewCard
								v-for="review in firstRow"
								:key="review.id"
								:img="review.avatar"
								:name="review.name"
								:username="review.username"
								:body="review.content"
							/>
						</Marquee>

						<Marquee
							reverse
							class="marquee marquee-bottom-2"
							:pause-on-hover="false"
						>
							<ReviewCard
								v-for="review in firstRow"
								:key="review.id"
								:img="review.avatar"
								:name="review.name"
								:username="review.username"
								:body="review.content"
							/>
						</Marquee>
					</div>
				</div>
			</main>
		</div>

		<!-- MultiStepLoader 组件 -->
		<MultiStepLoader
			:steps="commentSteps"
			:loading="isLoading"
			:prevent-close="true"
			@complete="handleLoadingComplete"
			@close="handleLoaderClose"
		/>
	</section>
</template>

<script setup lang="ts">
import Marquee from '~/components/inspira/card/marquee/Marquee.vue'
import ReviewCard from '~/components/inspira/card/marquee/ReviewCard.vue'
import IInput from '~/components/inspira/miscellaneous/IInput.vue'
import ColourfulText from '~/components/inspira/text/ColourfulText.vue'
import ShimmerButton from '~/components/inspira/button/ShimmerButton.vue'
import MultiStepLoader from '~/components/inspira/miscellaneous/MultiStepLoader.vue'
import { MessageAddRequest } from '~/api'

interface Step {
	text: string
	afterText?: string
	async?: boolean
	duration?: number
	action?: () => void
}

const reviews = ref([])

// Rows
const firstRow = ref(reviews)

const comment = ref<MessageAddRequest>({
	content: '',
})

// 多步加载器状态管理
const isLoading = ref(false)
const loaderStates = reactive({
	isValidating: false,
	isSending: false,
	isUpdating: false,
})

// 留言发送步骤配置
const commentSteps = computed<Step[]>(() => [
	{
		text: '验证留言内容',
		duration: 800,
		action: () => {
			loaderStates.isValidating = true
		}
	},
	{
		text: '发送留言到服务器',
		async: loaderStates.isSending,
		afterText: '留言发送成功',
		action: () => {
			loaderStates.isSending = true
		}
	},
	{
		text: '更新留言列表',
		async: loaderStates.isUpdating,
		afterText: '列表更新完成',
		action: () => {
			loaderStates.isUpdating = true
		}
	},
	{
		text: '完成',
		duration: 500,
		action: () => {
			// 完成后的清理工作
			handleLoadingComplete()
		}
	},
])

const send = async () => {
	if (!comment.value.content?.trim()) {
		toast.info('请不要发送空留言哦')
		return
	}

	// 重置加载器状态
	loaderStates.isValidating = false
	loaderStates.isSending = true
	loaderStates.isUpdating = true
	isLoading.value = true

	try {
		// 模拟验证阶段的延迟
		await new Promise(resolve => setTimeout(resolve, 800))

		// 发送留言
		await messageApi.addMessage(comment.value)
		loaderStates.isSending = false

		// 更新留言列表
		const response = await http.post('/message/list/all')
		reviews.value = response.data
		loaderStates.isUpdating = false
		
		// 发送后清空输入框
		comment.value.content = ''
		
		// 如果messageApi没有提示，在这里添加
		// toast.success('收到你的留言啦！😊')
		
	} catch (error) {
		console.error('发送留言失败:', error)
		toast.error('发送失败，请重试')
		isLoading.value = false
		// 重置状态
		loaderStates.isValidating = false
		loaderStates.isSending = false
		loaderStates.isUpdating = false
	}
}

// 处理加载完成
const handleLoadingComplete = () => {
	isLoading.value = false
	// 重置所有状态
	loaderStates.isValidating = false
	loaderStates.isSending = false
	loaderStates.isUpdating = false
}

// 处理加载器关闭
const handleLoaderClose = () => {
	isLoading.value = false
	// 重置状态
	loaderStates.isValidating = false
	loaderStates.isSending = false
	loaderStates.isUpdating = false
}

onMounted(async () => {
	try {
		const res = await http.post('/message/list/all')

		// 直接赋值，而不是 push，Vue 能正确追踪变化
		console.log(res)
		reviews.value = res.data
	} catch (error) {
		console.error('获取留言失败:', error)
	}
})
</script>

<style scoped>
/* 响应式 Marquee 定位 */
.marquee-top-1 {
	transform: translateY(-6rem) rotate(-16deg);
}

.marquee-top-2 {
	transform: translateY(-3rem) rotate(-16deg);
}

.marquee-bottom-1 {
	transform: translateY(6rem) rotate(-16deg);
}

.marquee-bottom-2 {
	transform: translateY(12rem) rotate(-16deg);
}

/* 小屏幕优化 */
@media (min-width: 640px) {
	.marquee-top-1 {
		transform: translateY(-8rem) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(-2rem) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(8rem) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(16rem) rotate(-16deg);
	}
}

/* 中等屏幕优化 */
@media (min-width: 768px) {
	.marquee-top-1 {
		transform: translateY(-10rem) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(-1rem) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(10rem) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(20rem) rotate(-16deg);
	}
}

/* 大屏幕优化 */
@media (min-width: 1024px) {
	.marquee-top-1 {
		transform: translateY(-11.5rem) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(1rem) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(13.5rem) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(26rem) rotate(-16deg);
	}
}

/* 超大屏幕优化 */
@media (min-width: 1280px) {
	.marquee-top-1 {
		transform: translateY(-13rem) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(2rem) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(15rem) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(30rem) rotate(-16deg);
	}
}
</style>
