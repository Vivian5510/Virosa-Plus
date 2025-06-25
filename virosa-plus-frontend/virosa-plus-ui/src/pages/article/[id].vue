<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { ArticleService } from '~/composables/apiService'
import TracingBeam from '~/components/inspira/miscellaneous/TracingBeam.vue'
import { AjaxResult } from '~/api/types'

// 获取当前路由
const route = useRoute()
const router = useRouter()

// 初始化markdown-it，但不使用prism插件
const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	breaks: true,
	// 禁用代码高亮，避免prism插件错误
	highlight: (str, lang) => {
		// 简单的代码块处理，不使用prism
		return `<pre class="language-${lang}"><code>${str}</code></pre>`
	},
})

// 默认内容
const defaultContent = `
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
`

const mdContent = ref(defaultContent)

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

// 格式化日期函数
const formatDate = (dateString: string) => {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

// 获取魔幻时间
const getMagicalDate = () => {
	const now = new Date()
	// 随机减去1-100年
	const yearOffset = Math.floor(Math.random() * 100) + 1
	// 随机加上1-1000年
	const futureYearOffset = Math.floor(Math.random() * 1000) + 1
	
	// 50%概率是过去，50%概率是未来
	if (Math.random() > 0.5) {
		now.setFullYear(now.getFullYear() - yearOffset)
		return `${formatDate(now.toISOString())} · 过去时空`
	} else {
		now.setFullYear(now.getFullYear() + futureYearOffset)
		return `${formatDate(now.toISOString())} · 未来时空`
	}
}

// 默认魔幻时间
const magicalDate = getMagicalDate()

// 存储文章数据
const articleData = ref({
	id: 0,
	title: '时空扰动',
	content: defaultContent,
	author: 'Rosy',
	updateTime: '',
	createTime: '',
	type: '未知',
	extraInfo: '此文本来自另一个维度',
	externalLink: '',
})

// 获取文章数据
onMounted(() => {
	convertMarkdownToHtml() // 先转换默认值

	const articleId = route.params.id // 获取动态路由参数 ID
	if (!articleId) return

	ArticleService.getArticleById(Number(articleId))
		.then((res: AjaxResult) => {
			// 适应后端API的实际响应格式
			if ((res.code === 0 || res.code === 200) && res.data) {
				console.log('获取文章成功:', res.data)
				
				// 更新文章内容
				if (res.data.content) {
					try {
						// 检查内容长度，如果过长可能需要分段处理
						const content = res.data.content
						if (content.length > 100000) {
							// 超过10万字符可能会有性能问题
							console.warn('文章内容过长，可能影响渲染性能:', content.length)
							// 可以选择截断或分段处理
							mdContent.value =
								content.substring(0, 100000) + '\n\n... 内容过长，已截断显示'
						} else {
							mdContent.value = content
						}
						// 转换为HTML
						convertMarkdownToHtml()
					} catch (error) {
						console.error('Markdown转换错误:', error)
						mdContent.value = defaultContent
						convertMarkdownToHtml()
					}
				} else {
					mdContent.value = defaultContent
					convertMarkdownToHtml()
				}
				
				// 更新页面标题
				document.title = res.data.title || '时空扰动'
				
				// 保存文章数据到响应式变量，用于模板显示
				articleData.value = {
					...res.data,
					author: res.data.author || 'Rosy',
					type: res.data.type || '未知',
					extraInfo: res.data.extraInfo || '此文本来自另一个维度'
				}
			} else {
				console.error('获取文章失败:', res.msg || '未知错误')
				mdContent.value = defaultContent
				convertMarkdownToHtml()
			}
		})
		.catch((error) => {
			console.error('获取文章详情失败:', error)
			mdContent.value = defaultContent
			convertMarkdownToHtml()
	})
})
</script>

<template>
	<div class="px-0 py-4 sm:px-4 md:px-6">
		<div class="flex justify-center">
			<main class="w-full max-w-full sm:max-w-5xl">
				<TracingBeam class="article-tracing-beam">
					<div
						v-if="articleContentHtml"
						class="bg-background w-full border border-black/[0.1] rounded-lg bg-gray-50 p-2 shadow-md dark:border-white/[0.2] dark:bg-[#242222] sm:p-4 md:p-8 md:shadow-xl"
					>
						<!-- 文章标题区域 -->
						<div class="mb-4 sm:mb-6 flex flex-col items-center">
							<h1
								class="mb-2 sm:mb-3 text-center text-xl font-bold sm:text-2xl md:text-4xl break-words"
							>
								{{ articleData.title || '时空扰动' }}
							</h1>
							<div class="flex flex-wrap justify-center items-center text-sm text-gray-500">
								<span>
									{{ articleData.updateTime ? formatDate(articleData.updateTime) : magicalDate }}
								</span>
								<span class="mx-2">•</span>
								<span>作者：{{ articleData.author }}</span>
							</div>
						</div>

						<!-- 文章内容 -->
						<div
							class="font-lxgw prose-sm sm:prose md:prose-lg max-w-none break-words overflow-hidden"
							v-html="articleContentHtml"
						></div>

						<!-- 文章信息 -->
						<div
							class="mt-6 sm:mt-8 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700"
						>
							<div class="mb-2">
								<span class="font-medium">类型：</span>{{ articleData.type }}
							</div>
							<div class="mb-2">
								<span class="font-medium">附加信息：</span
								>{{ articleData.extraInfo }}
							</div>
							<div v-if="articleData.externalLink" class="mb-2">
								<span class="font-medium">外部链接：</span>
								<a
									:href="articleData.externalLink"
									target="_blank"
									class="text-blue-500 hover:underline break-all"
									>{{ articleData.externalLink }}</a
								>
							</div>
						</div>
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
	
	:deep(pre) {
		max-width: 100%;
		overflow-x: auto;
	}
	
	:deep(img) {
		max-width: 100%;
		height: auto;
	}
	
	:deep(table) {
		display: block;
		width: 100%;
		overflow-x: auto;
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
	
	:deep(pre) {
		font-size: 0.8em;
	}
}

/* 宽屏下稍微减少左侧边距 */
@media (min-width: 1024px) {
	.article-tracing-beam {
		margin-left: 0; /* 宽屏下不需要额外边距 */
	}
}

/* 增加文章内容宽度 */
:deep(.prose) {
	max-width: 100%;
}

/* 处理长单词和URL的换行 */
:deep(.prose p),
:deep(.prose li),
:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
	word-wrap: break-word;
	overflow-wrap: break-word;
	word-break: break-word;
}

/* 确保代码块不会溢出 */
:deep(pre) {
	white-space: pre-wrap;
	word-wrap: break-word;
	max-width: 100%;
	overflow-x: auto;
}

/* 修复窄屏下的内容溢出问题 */
:deep(iframe),
:deep(video),
:deep(embed),
:deep(object) {
	max-width: 100%;
}

/* 确保内联代码不会导致水平滚动 */
:deep(code) {
	word-break: break-all;
	white-space: pre-wrap;
}
</style>
