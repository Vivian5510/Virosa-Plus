<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import Prism from 'markdown-it-prism'
import { articleApi } from '~/composables/http'
import TracingBeam from '~/components/inspira/miscellaneous/TracingBeam.vue'

// 获取当前路由
const route = useRoute()

const md = new MarkdownIt()
md.use(Prism as any)

const mdContent = ref(`
### **🜂 数字游牧者，你已偏离主线世界**

🚨 **「时空扰动警告」** 🚨

「你正试图抵达一篇不存在的文章，
但数据流中的坐标已发生塌缩。」

---

### **🜁 可能的原因**
🔹 **该文本仍未降临现实** —— 也许它还在时间的缝隙里发育。

🔹 **存储区塌陷** —— 服务器记忆体中留存了一片空白。

🔹 **你超前于内容** —— 这段文字尚未被编写，但你已经抵达。

---

### **🜄 你现在可以选择**
🔹 **回溯上一个阅读坐标** —— 也许那是更稳定的时间节点。

🔹 **停留此处，观测数据湮灭现象** —— 记录下虚空的形态。

🔹 **尝试重载现实** —— 也许这只是短暂的缓存错觉。

🌀 请注意：有些故事未曾写就，

但它们仍然潜伏在你即将抵达的未来。

---

### **🜲 404 读取失败 · 可能性残留**

「你现在所见到的，是：」

- **一份空白的章节，等待某位旅者填充。**
- **服务器记忆深处，一次意外遗失的想法。**
- **或者，仅仅是你认知世界方式的一次短暂偏移。**

_🔮 你可以离开，也可以留下，
毕竟，所有伟大的故事，都是从一片空白开始的。_
`)

// 监听 mdContent 变化，并自动转换
watch(mdContent, () => {
	convertMarkdownToHtml()
})

// 存储转换后的 HTML 内容
const articleContentHtml = ref('')

// 转换 Markdown 为 HTML
const convertMarkdownToHtml = () => {
	articleContentHtml.value = md.render(mdContent.value)
}

// 获取文章数据
onMounted(() => {
	convertMarkdownToHtml() // 先转换默认值

	const articleId = route.params.id // 获取动态路由参数 ID
	if (!articleId) return

	articleApi.getArticleVOById(articleId).then((res) => {
		mdContent.value = res.data.content // 这里触发 watch 监听，自动调用 convertMarkdownToHtml
	})
})
</script>

<template>
	<div class="px-4 py-4 md:px-8 md:py-6">
		<div class="flex justify-center">
			<main class="max-w-3xl w-full">
				<TracingBeam class="article-tracing-beam">
					<div
						v-if="articleContentHtml"
						class="bg-background w-full border border-black/[0.1] rounded-lg bg-gray-50 p-4 shadow-md dark:border-white/[0.2] dark:bg-[#242222] md:p-8 sm:p-6 md:shadow-xl"
					>
						<!-- 文章标题区域 -->
						<div class="mb-6 flex flex-col items-center">
							<h1
								class="mb-3 text-center text-2xl font-bold md:text-4xl sm:text-3xl"
							>
								{{ route.query.title || '无标题文章' }}
							</h1>
							<div class="flex items-center text-sm text-gray-500">
								<span>发布于 {{ new Date().toLocaleDateString() }}</span>
								<span class="mx-2">•</span>
								<span
									>阅读时间 约{{
										Math.max(1, Math.ceil(mdContent.length / 400))
									}}分钟</span
								>
							</div>
						</div>

						<!-- 文章内容 -->
						<div
							class="prose-sm md:prose-lg font-lxgw max-w-none prose sm:prose"
							v-html="articleContentHtml"
						></div>
					</div>
				</TracingBeam>
			</main>
		</div>
	</div>
</template>

<style scoped>
@media (max-width: 640px) {
	:deep(.prose) {
		font-size: 0.95em;
	}
	
	.article-tracing-beam {
		margin-left: 14px; /* 微调移动端为追踪线预留的空间 */
	}
}

/* 确保在超小屏幕上不会产生横向滚动条 */
@media (max-width: 380px) {
	.article-tracing-beam {
		margin-left: 18px; /* 在超小屏幕上增加左侧间距 */
		font-size: 0.9em; /* 稍微缩小字体以适应窄屏 */
	}
}

/* 宽屏下稍微减少左侧边距 */
@media (min-width: 1024px) {
	.article-tracing-beam {
		margin-left: 0; /* 宽屏下不需要额外边距 */
	}
}
</style>
