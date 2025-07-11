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
		day: 'numeric',
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
					extraInfo: res.data.extraInfo || '此文本来自另一个维度',
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
	<div class="px-0 py-8 md:px-6 sm:px-4">

		<div class="relative flex justify-center">
			<main class="max-w-full w-full sm:max-w-5xl">
				<TracingBeam class="article-tracing-beam">
					<article
						v-if="articleContentHtml"
						class="relative overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out"
					>
						<!-- 文章顶部装饰渐变 -->
						<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-gray-500 to-slate-600"></div>
						
						<!-- 文章标题区域 -->
						<header class="relative px-6 py-12 md:px-12 md:py-16 text-center">
							<!-- 标题背景装饰 -->
							<div class="absolute inset-0 bg-gradient-to-br from-slate-500/3 via-gray-500/3 to-slate-600/3 rounded-t-3xl"></div>
							
							<div class="relative">
								<!-- 文章类型标签 -->
								<div class="mb-6 flex justify-center">
									<span class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-500/10 to-slate-500/10 border border-gray-200/30 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 backdrop-blur-sm">
										📝
										<span class="ml-2">{{ articleData.type }}</span>
									</span>
								</div>

								<!-- 文章标题 -->
								<h1 class="mb-8 break-words text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
									<span class="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
										{{ articleData.title || '时空扰动' }}
									</span>
								</h1>

								<!-- 文章元信息 -->
								<div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-600 dark:text-slate-300">
									<!-- 发布时间 -->
									<div class="flex items-center space-x-3">
										<span class="text-xl">📅</span>
										<span class="font-medium">
											{{
												articleData.updateTime
													? formatDate(articleData.updateTime)
													: magicalDate
											}}
										</span>
									</div>

									<!-- 作者信息 -->
									<div class="flex items-center space-x-3">
										<span class="text-xl">👤</span>
										<span class="font-medium">{{ articleData.author }}</span>
									</div>

									<!-- 阅读时间估算 -->
									<div class="flex items-center space-x-3">
										<span class="text-xl">⏱️</span>
										<span class="font-medium">{{ Math.ceil(mdContent.length / 300) }} 分钟阅读</span>
									</div>
								</div>
							</div>
						</header>

						<!-- 分割线装饰 -->
						<div class="relative mx-6 md:mx-12">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t border-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
							</div>
							<div class="relative flex justify-center">
								<div class="bg-white dark:bg-slate-900 px-4">
									<div class="w-3 h-3 bg-gradient-to-r from-slate-400 to-gray-500 rounded-full"></div>
								</div>
							</div>
						</div>

						<!-- 文章内容 -->
						<main class="relative px-6 py-12 md:px-12 md:py-16">
							<div
								class="article-content font-lxgw prose prose-lg md:prose-xl max-w-none prose-slate dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:rounded prose-code:px-2 prose-code:py-1"
								v-html="articleContentHtml"
							></div>
						</main>

						<!-- 文章底部信息 -->
						<footer class="relative px-6 py-8 md:px-12 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-800/50 dark:to-slate-700/30 rounded-b-3xl">
							<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								<!-- 文章类型 -->
								<div class="flex items-center space-x-3 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:shadow-lg transition-all duration-300">
									<div class="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center text-xl">
										📂
									</div>
									<div>
										<div class="text-sm text-slate-500 dark:text-slate-400">文章类型</div>
										<div class="font-semibold text-slate-900 dark:text-slate-100">{{ articleData.type }}</div>
									</div>
								</div>

								<!-- 附加信息 -->
								<div class="flex items-center space-x-3 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:shadow-lg transition-all duration-300">
									<div class="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center text-xl">
										💡
									</div>
									<div>
										<div class="text-sm text-slate-500 dark:text-slate-400">附加信息</div>
										<div class="font-semibold text-slate-900 dark:text-slate-100">{{ articleData.extraInfo }}</div>
									</div>
								</div>

								<!-- 外部链接 -->
								<div v-if="articleData.externalLink" class="flex items-center space-x-3 p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:shadow-lg transition-all duration-300">
									<div class="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center text-xl">
										🔗
									</div>
									<div class="flex-1 min-w-0">
										<div class="text-sm text-slate-500 dark:text-slate-400">外部链接</div>
										<a
											:href="articleData.externalLink"
											target="_blank"
											class="font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200 truncate block"
										>
											{{ articleData.externalLink }}
										</a>
									</div>
								</div>
							</div>
						</footer>
					</article>
				</TracingBeam>
			</main>
		</div>
	</div>
</template>

<style scoped>
/* 自定义动画 */
@keyframes float {
	0%, 100% { transform: translateY(0px) rotate(0deg); }
	33% { transform: translateY(-10px) rotate(-1deg); }
	66% { transform: translateY(-5px) rotate(1deg); }
}

@keyframes gradient-shift {
	0%, 100% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
}

@keyframes shimmer {
	0% { transform: translateX(-100%); }
	100% { transform: translateX(100%); }
}

/* 文章内容美化 */
.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
	position: relative;
	background: linear-gradient(-45deg, #4a5568, #718096, #a0aec0, #cbd5e0);
	background-size: 400% 400%;
	animation: gradient-shift 8s ease infinite;
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;
	font-weight: 900;
	letter-spacing: -0.02em;
}

.article-content :deep(h1::after),
.article-content :deep(h2::after),
.article-content :deep(h3::after) {
	content: '';
	position: absolute;
	bottom: -8px;
	left: 0;
	right: 0;
	height: 3px;
	background: linear-gradient(90deg, transparent, #718096, #a0aec0, transparent);
	border-radius: 2px;
	opacity: 0.6;
}

/* 段落增强 */
.article-content :deep(p) {
	position: relative;
	line-height: 1.8;
	text-align: justify;
	hyphens: auto;
	margin: 1.5em 0;
}

/* 首字母装饰 - 暂时禁用以避免emoji显示问题 */
/* 
.article-content :deep(p:first-of-type::first-letter) {
	float: left;
	font-size: 2.2em;
	line-height: 1;
	margin: 0.1em 0.3em 0.1em 0;
	background: linear-gradient(135deg, #667eea, #764ba2);
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;
	font-weight: 900;
	padding-top: 0.1em;
}
*/

/* 列表美化 */
.article-content :deep(ul),
.article-content :deep(ol) {
	position: relative;
	padding-left: 2em;
	margin: 1.5em 0;
}

.article-content :deep(li) {
	position: relative;
	margin: 0.75em 0;
	padding-left: 0.5em;
}

.article-content :deep(ul li::marker) {
	content: "▶";
	color: #4a5568;
	font-weight: bold;
}

/* 引用块极致美化 */
.article-content :deep(blockquote) {
	position: relative;
	margin: 2em 0;
	padding: 2em 2.5em;
	background: linear-gradient(135deg, 
		rgba(74, 85, 104, 0.05) 0%, 
		rgba(113, 128, 150, 0.08) 50%, 
		rgba(160, 174, 192, 0.05) 100%);
	border: none;
	border-radius: 20px;
	box-shadow: 
		0 10px 30px rgba(74, 85, 104, 0.1),
		inset 0 1px 0 rgba(255, 255, 255, 0.6);
	backdrop-filter: blur(10px);
	font-style: italic;
	color: #4a5568;
}

.article-content :deep(blockquote::before) {
	content: """;
	position: absolute;
	top: -10px;
	left: 20px;
	font-size: 4em;
	color: #4a5568;
	opacity: 0.3;
	font-family: Georgia, serif;
	line-height: 1;
}

.article-content :deep(blockquote::after) {
	content: """;
	position: absolute;
	bottom: -30px;
	right: 20px;
	font-size: 4em;
	color: #4a5568;
	opacity: 0.3;
	font-family: Georgia, serif;
	line-height: 1;
}

/* 代码块极致美化 */
.article-content :deep(pre) {
	position: relative;
	margin: 2em 0;
	padding: 2em;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%);
	border-radius: 20px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 
		0 20px 40px rgba(0, 0, 0, 0.4),
		inset 0 1px 0 rgba(255, 255, 255, 0.1);
	overflow-x: auto;
	font-family: 'JetBrains Mono', 'Fira Code', Monaco, 'Courier New', monospace;
	font-size: 0.9em;
	line-height: 1.6;
	color: #e2e8f0;
}

.article-content :deep(pre::before) {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 40px;
	background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
	border-radius: 20px 20px 0 0;
	opacity: 0.1;
}

.article-content :deep(pre code) {
	background: transparent;
	color: inherit;
	padding: 0;
	border-radius: 0;
	font-size: inherit;
}

/* 内联代码美化 */
.article-content :deep(code) {
	background: linear-gradient(135deg, rgba(74, 85, 104, 0.1), rgba(113, 128, 150, 0.1));
	color: #4a5568;
	padding: 0.2em 0.5em;
	border-radius: 8px;
	font-weight: 600;
	font-size: 0.9em;
	border: 1px solid rgba(74, 85, 104, 0.2);
	font-family: 'JetBrains Mono', 'Fira Code', Monaco, 'Courier New', monospace;
}

/* 链接极致美化 */
.article-content :deep(a) {
	position: relative;
	color: #4a5568;
	text-decoration: none;
	font-weight: 600;
	background: linear-gradient(120deg, transparent 0%, transparent 50%, #4a5568 50%);
	background-size: 240% 100%;
	background-position: 100% 0;
	transition: all 0.3s ease;
	padding: 0.1em 0.2em;
	border-radius: 4px;
}

.article-content :deep(a:hover) {
	background-position: 0 0;
	color: white;
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(74, 85, 104, 0.3);
}

/* 表格极致美化 */
.article-content :deep(table) {
	margin: 2em 0;
	border-collapse: separate;
	border-spacing: 0;
	background: white;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 
		0 20px 40px rgba(0, 0, 0, 0.1),
		0 1px 3px rgba(0, 0, 0, 0.1);
	width: 100%;
}

.article-content :deep(table th) {
	background: linear-gradient(135deg, #4a5568, #718096);
	color: white;
	padding: 1.5em 1em;
	font-weight: 700;
	text-align: left;
	position: relative;
	border: none;
}

.article-content :deep(table th::after) {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
}

.article-content :deep(table td) {
	padding: 1.2em 1em;
	border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	transition: background-color 0.2s ease;
}

.article-content :deep(table tbody tr:hover td) {
	background: linear-gradient(135deg, rgba(74, 85, 104, 0.02), rgba(113, 128, 150, 0.02));
}

.article-content :deep(table tbody tr:nth-child(even) td) {
	background: rgba(74, 85, 104, 0.02);
}

/* 图片美化 */
.article-content :deep(img) {
	border-radius: 16px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
	margin: 2em auto;
	display: block;
	max-width: 100%;
	height: auto;
}

.article-content :deep(img:hover) {
	transform: scale(1.02) translateY(-5px);
	box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

/* 水平分割线美化 */
.article-content :deep(hr) {
	border: none;
	height: 3px;
	background: linear-gradient(90deg, transparent, #4a5568, #718096, #a0aec0, transparent);
	margin: 3em 0;
	border-radius: 2px;
	position: relative;
}

.article-content :deep(hr::after) {
	content: '✦';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	color: #4a5568;
	padding: 0 1em;
	font-size: 1.2em;
}

/* 响应式设计优化 */
@media (max-width: 640px) {
	.article-content :deep(.prose) {
		font-size: 0.95em;
	}

	.article-content :deep(h1),
	.article-content :deep(h2),
	.article-content :deep(h3) {
		font-size: 1.5em;
	}

	.article-content :deep(pre) {
		padding: 1em;
		margin: 1em 0;
		font-size: 0.8em;
		overflow-x: auto;
	}

	.article-content :deep(blockquote) {
		padding: 1.5em;
		margin: 1.5em 0;
	}

	.article-content :deep(table) {
		font-size: 0.85em;
	}

	.article-content :deep(table th),
	.article-content :deep(table td) {
		padding: 0.8em 0.6em;
	}

	.article-tracing-beam {
		margin-left: 14px;
	}
}

/* 超小屏幕优化 */
@media (max-width: 380px) {
	.article-tracing-beam {
		margin-left: 18px;
		font-size: 0.9em;
	}

	.article-content :deep(pre) {
		font-size: 0.75em;
		padding: 0.8em;
	}

}

/* 宽屏优化 */
@media (min-width: 1024px) {
	.article-tracing-beam {
		margin-left: 0;
	}

	.article-content :deep(h1) {
		font-size: 3.5em;
	}

	.article-content :deep(h2) {
		font-size: 2.5em;
	}

	.article-content :deep(h3) {
		font-size: 2em;
	}
}

/* 滚动条美化 */
.article-content :deep(*::-webkit-scrollbar) {
	width: 8px;
	height: 8px;
}

.article-content :deep(*::-webkit-scrollbar-track) {
	background: rgba(0, 0, 0, 0.1);
	border-radius: 4px;
}

.article-content :deep(*::-webkit-scrollbar-thumb) {
	background: linear-gradient(135deg, #4a5568, #718096);
	border-radius: 4px;
}

.article-content :deep(*::-webkit-scrollbar-thumb:hover) {
	background: linear-gradient(135deg, #2d3748, #4a5568);
}

/* 选中文本美化 */
.article-content :deep(::selection) {
	background: linear-gradient(135deg, rgba(74, 85, 104, 0.3), rgba(113, 128, 150, 0.3));
	color: #1a202c;
}

/* 整体布局和通用样式 */
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

/* 确保多媒体内容响应式 */
:deep(iframe),
:deep(video),
:deep(embed),
:deep(object) {
	max-width: 100%;
	border-radius: 16px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 添加页面加载动画 */
article {
	animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 标题区域动画 */
header {
	animation: slideInDown 0.6s ease-out;
}

@keyframes slideInDown {
	from {
		opacity: 0;
		transform: translateY(-30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 内容区域动画 */
main {
	animation: fadeIn 0.8s ease-out 0.2s both;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

/* 底部信息区域动画 */
footer {
	animation: slideInUp 0.6s ease-out 0.4s both;
}

@keyframes slideInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
