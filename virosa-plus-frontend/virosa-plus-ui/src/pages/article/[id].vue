<script setup lang="ts">
import { isDark } from 'vue-dark-switch'
import { File, Folder, Tree } from '~/components/inspira/miscellaneous/FileTree'
import CardSpotlight from '~/components/inspira/card/CardSpotlight.vue'
import MarkdownIt from 'markdown-it'
import Prism from 'markdown-it-prism'
import { articleApi } from '~/composables/http'

// 获取当前路由
const route = useRoute()

const md = new MarkdownIt()
md.use(Prism as any)

const mdContent = ref(`
# 这是默认

这是段落内容。以下是一个列表：

- 项目 1
- 项目 2
- 项目 3

> 这是引用文本

\`\`\`js
console.log("Hello, world!");
\`\`\`
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
	<div>
		<div class="flex">
			<main class="h-fit w-250 flex gap-2 p-4">
				<div
					v-if="articleContentHtml"
					class="bg-background z-[-2] w-250 border border-black/[0.1] rounded-lg bg-gray-50 p-10 dark:border-white/[0.2] dark:bg-[#242222] md:shadow-xl"
				>
					<!-- 渲染转换后的 HTML -->
					<div class="prose" v-html="articleContentHtml"></div>
				</div>
			</main>
		</div>
	</div>
</template>

<style scoped></style>
