<template>
	<section>
		<!-- 侧边栏 -->
		<div class="flex">
			<!-- Closing tag added correctly here -->

			<!-- 主内容区域 -->
			<main class="p-8">
				<div
					class="mt-80 h-56 w-200 flex flex-col items-center justify-center gap-2"
				>
					<div
						class="flex flex-row items-center justify-center gap-2 text-center text-2xl font-bold font-sans lg:text-7xl md:text-5xl"
					>
						<ColourfulText text="Leave Your Message" />
					</div>
					<div class="w-full flex flex-row items-center justify-center gap-2">
						<IInput
							id="inputDemo"
							v-model="comment.content"
							placeholder="Just Say"
							container-class="w-full max-w-sm"
						></IInput>
						<ShimmerButton class="shadow-2xl" shimmer-size="2px" @click="send">
							<span
								class="whitespace-pre-wrap text-center text-sm text-white font-medium leading-none tracking-tight dark:from-white dark:to-slate-900/10 lg:text-lg"
							>
								Send
							</span>
						</ShimmerButton>
					</div>
				</div>

				<!-- Tilted Marquees -->
				<div class="absolute inset-0 overflow-hidden -z-2">
					<!-- 上部分 -->
					<div class="space-y-6">
						<Marquee
							:style="{ transform: 'translateY(-11.5rem) rotate(-16deg)' }"
							class="marquee"
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

						<Marquee
							:style="{ transform: 'translateY(1rem) rotate(-16deg)' }"
							reverse
							class="marquee"
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
					<div class="h-50"></div>

					<!-- 下部分 -->
					<div class="space-y-6">
						<Marquee
							:style="{ transform: 'translateY(13.5rem) rotate(-16deg)' }"
							class="marquee"
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

						<Marquee
							:style="{ transform: 'translateY(26rem) rotate(-16deg)' }"
							reverse
							class="marquee"
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
	</section>
</template>

<script setup lang="ts">
import Marquee from '~/components/inspira/card/marquee/Marquee.vue'
import ReviewCard from '~/components/inspira/card/marquee/ReviewCard.vue'
import IInput from '~/components/inspira/miscellaneous/IInput.vue'
import ColourfulText from '~/components/inspira/text/ColourfulText.vue'
import ShimmerButton from '~/components/inspira/button/ShimmerButton.vue'
import { MessageAddRequest } from '~/api'

const reviews = ref([])

// Rows
const firstRow = ref(reviews)

const comment = ref<MessageAddRequest>({
	content: '',
})

const send = () => {
	if (!comment.value.content?.trim()) {
		toast.info('请不要发送空留言哦')
		return
	}

	messageApi.addMessage(comment.value).then(async (res) => {
		// 发送后清空输入框
		comment.value.content = ''
		toast.success('收到你的留言啦！😊')

		// 发送完留言后立即请求数据更新评论列表
		try {
			const response = await http.post('/message/list/all')
			// 直接赋值，而不是 push，Vue 能正确追踪变化
			console.log(response)
			reviews.value = response.data
		} catch (error) {
			console.error('获取留言失败:', error)
		}
	})
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
