<template>
	<section class="fixed inset-0 overflow-hidden">
		<!-- 主内容区域 -->
		<main class="relative w-full h-full overflow-hidden">
			<!-- 完整的垂直布局 -->
			<div class="relative flex flex-col items-center justify-center h-full w-full">
					
					<!-- 背景 Marquee 层 -->
					<div class="fixed inset-0 overflow-hidden -z-10 opacity-60">
						<!-- 上部分两条 Marquee -->
						<Marquee class="marquee marquee-top-1" :pause-on-hover="false">
							<ReviewCard
								v-for="review in firstRow"
								:key="review.id"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
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
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
							/>
						</Marquee>

						<!-- 下部分两条 Marquee -->
						<Marquee class="marquee marquee-bottom-1" :pause-on-hover="false">
							<ReviewCard
								v-for="review in firstRow"
								:key="review.id"
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
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
								:img="review.img"
								:name="review.name"
								:username="review.username"
								:body="review.body"
							/>
						</Marquee>
					</div>

					<!-- 前景内容区域 -->
					<div class="relative z-20 flex flex-col items-center justify-center gap-8">
						<!-- 标题 -->
						<div
							class="flex flex-row items-center justify-center gap-2 text-center text-lg font-bold font-sans 2xl:text-7xl lg:text-5xl md:text-4xl sm:text-2xl xl:text-6xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 dark:from-gray-900/20 dark:via-gray-900/10 dark:to-gray-900/20 backdrop-blur-md rounded-3xl px-8 py-4 border border-white/20 dark:border-gray-700/20 shadow-lg"
						>
							<ColourfulText text="Leave Your Message" />
						</div>

						<!-- 发送区块 -->
						<div
							class="w-full flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4 max-w-2xl"
						>
							<IInput
								id="inputDemo"
								v-model="comment.content"
								placeholder="Just Say"
								container-class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
							></IInput>
							<ShimmerButton
								class="h-10 min-w-16 px-4 shadow-2xl sm:h-12 sm:min-w-20 sm:px-6"
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
				</div>
			</main>

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
import { MessageAddReqVO, MessageQueryReqVO } from '~/api/generated'
import { MessageService } from '~/composables/apiService'

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

const comment = ref<MessageAddReqVO>({
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
		},
	},
	{
		text: '发送留言到服务器',
		async: loaderStates.isSending,
		afterText: '留言发送成功',
		action: () => {
			loaderStates.isSending = true
		},
	},
	{
		text: '更新留言列表',
		async: loaderStates.isUpdating,
		afterText: '列表更新完成',
		action: () => {
			loaderStates.isUpdating = true
		},
	},
	{
		text: '完成',
		duration: 500,
		action: () => {
			// 完成后的清理工作
			handleLoadingComplete()
		},
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
		await new Promise((resolve) => setTimeout(resolve, 800))

		// 发送留言
		await MessageService.addMessage(comment.value)
		loaderStates.isSending = false

		// 更新留言列表
		const queryRequest: MessageQueryReqVO = {
			pageNum: 1,
			pageSize: 1000, // 获取足够多的消息
		}
		const response = await MessageService.listMessages(queryRequest)
		console.log('API响应:', response)
		console.log('response.data:', response.data)
		console.log('response.data?.data:', response.data?.data)
		
		const messageList = response.data?.list || []
		console.log('messageList:', messageList)
		
		const transformedData = transformMessageData(messageList)
		console.log('transformedData:', transformedData)
		
		reviews.value = transformedData
		loaderStates.isUpdating = false
		console.log('reviews.value:', reviews.value)
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

// 科幻风格用户名生成器
const generateSciFiUsername = (id: number) => {
	const prefixes = [
		'Cyber', 'Neo', 'Quantum', 'Plasma', 'Void', 'Stellar', 'Astro', 'Nano', 
		'Techno', 'Matrix', 'Digital', 'Pixel', 'Hyper', 'Ultra', 'Mega', 'Prime',
		'Ghost', 'Shadow', 'Neon', 'Chrome', 'Steel', 'Binary', 'Code', 'Data'
	]
	
	const suffixes = [
		'Walker', 'Hunter', 'Rider', 'Drifter', 'Pilot', 'Scout', 'Ranger', 'Knight',
		'Voyager', 'Explorer', 'Hacker', 'Coder', 'Nexus', 'Protocol', 'System', 'Core',
		'Bot', 'Drone', 'Unit', 'Entity', 'Being', 'Mind', 'Soul', 'Spark',
		'Zero', 'One', 'Prime', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Omega'
	]
	
	const numbers = ['X', 'Z', '3', '7', '9', '0', '1', '2077', '404', '777', '999']
	
	// 使用ID作为种子来确保一致性
	const prefixIndex = id % prefixes.length
	const suffixIndex = (id * 3) % suffixes.length
	const numberIndex = (id * 7) % numbers.length
	
	const shouldAddNumber = id % 3 === 0 // 1/3的概率添加数字
	
	const baseName = prefixes[prefixIndex] + suffixes[suffixIndex]
	return shouldAddNumber ? baseName + numbers[numberIndex] : baseName
}

// 转换后端数据格式为 ReviewCard 需要的格式
const transformMessageData = (messages: any[]) => {
	return messages.map((message, index) => {
		const sciFiName = generateSciFiUsername(message.id)
		return {
			id: message.id,
			name: sciFiName, // 使用科幻风格用户名
			username: `@${sciFiName.toLowerCase()}`, // 生成对应的用户名
			img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.id}`, // 使用 ID 生成头像
			body: message.content, // 留言内容
			createTime: message.createTime,
		}
	})
}

onMounted(async () => {
	try {
		console.log('=== onMounted 开始获取留言 ===')
		const queryRequest: MessageQueryReqVO = {
			pageNum: 1,
			pageSize: 1000, // 获取足够多的消息
		}
		console.log('查询参数:', queryRequest)
		
		const res = await MessageService.listMessages(queryRequest)
		console.log('onMounted API响应:', res)
		console.log('onMounted res.data:', res.data)
		
		// 获取数据列表并转换格式
		const messageList = res.data?.list || []
		console.log('onMounted messageList:', messageList)
		
		const transformedData = transformMessageData(messageList)
		console.log('onMounted transformedData:', transformedData)
		
		reviews.value = transformedData
		console.log('onMounted reviews.value:', reviews.value)
		console.log('=== onMounted 完成 ===')
	} catch (error) {
		console.error('获取留言失败:', error)
	}
})
</script>

<style scoped>
/* 响应式 Marquee 定位 - 四条分布：上2条，下2条 */
.marquee-top-1 {
	transform: translateY(calc(50vh - 18rem)) rotate(-16deg);
}

.marquee-top-2 {
	transform: translateY(calc(50vh - 15rem)) rotate(-16deg);
}

.marquee-bottom-1 {
	transform: translateY(calc(50vh + 4rem)) rotate(-16deg);
}

.marquee-bottom-2 {
	transform: translateY(calc(50vh + 7rem)) rotate(-16deg);
}

/* 小屏幕优化 */
@media (min-width: 640px) {
	.marquee-top-1 {
		transform: translateY(calc(50vh - 16rem)) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(calc(50vh - 13rem)) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(calc(50vh + 2rem)) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(calc(50vh + 5rem)) rotate(-16deg);
	}
}

/* 中等屏幕优化 */
@media (min-width: 768px) {
	.marquee-top-1 {
		transform: translateY(calc(50vh - 17rem)) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(calc(50vh - 14rem)) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(calc(50vh + 3rem)) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(calc(50vh + 6rem)) rotate(-16deg);
	}
}

/* 大屏幕优化 */
@media (min-width: 1024px) {
	.marquee-top-1 {
		transform: translateY(calc(50vh - 19rem)) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(calc(50vh - 16rem)) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(calc(50vh + 5rem)) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(calc(50vh + 8rem)) rotate(-16deg);
	}
}

/* 超大屏幕优化 */
@media (min-width: 1280px) {
	.marquee-top-1 {
		transform: translateY(calc(50vh - 21rem)) rotate(-16deg);
	}

	.marquee-top-2 {
		transform: translateY(calc(50vh - 18rem)) rotate(-16deg);
	}

	.marquee-bottom-1 {
		transform: translateY(calc(50vh + 7rem)) rotate(-16deg);
	}

	.marquee-bottom-2 {
		transform: translateY(calc(50vh + 10rem)) rotate(-16deg);
	}
}
</style>
