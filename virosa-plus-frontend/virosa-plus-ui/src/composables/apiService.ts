/**
 * API服务封装
 * 此文件用于简化API调用
 */
import {
	ArticleControllerApiFactory,
	IssueControllerApiFactory,
	MessageControllerApiFactory,
	NodeControllerApiFactory,
} from '~/api'
import { http } from './http'

/**
 * 文章服务
 */
export const ArticleService = {
	// 获取文章详情
	getArticleById(id: number) {
		return ArticleControllerApiFactory(
			undefined,
			undefined,
			http,
		).getArticleById(id)
	},

	// 分页查询文章
	listArticles(params: any = {}) {
		return ArticleControllerApiFactory(undefined, undefined, http).page3(params)
	},

	// 删除文章
	deleteArticle(id: number) {
		return ArticleControllerApiFactory(
			undefined,
			undefined,
			http,
		).deleteArticle(id)
	},

	// 创建文章
	createArticle(data: any) {
		return ArticleControllerApiFactory(
			undefined,
			undefined,
			http,
		).createArticle(data)
	},

	// 更新文章
	updateArticle(id: number, data: any) {
		return ArticleControllerApiFactory(
			undefined,
			undefined,
			http,
		).updateArticle(id, data)
	},
}

/**
 * 留言服务
 */
export const MessageService = {
	// 新增留言
	addMessage(data: any) {
		return MessageControllerApiFactory(undefined, undefined, http).add1(data)
	},

	// 分页查询留言
	listMessages(params: any = {}) {
		return MessageControllerApiFactory(undefined, undefined, http).page1(params)
	},

	// 删除留言
	deleteMessage(id: number) {
		return MessageControllerApiFactory(undefined, undefined, http).remove1(id)
	},

	// 获取留言详情
	getMessageById(id: number) {
		return MessageControllerApiFactory(undefined, undefined, http).getInfo1(id)
	},

	// 更新留言
	updateMessage(id: number, data: any) {
		return MessageControllerApiFactory(undefined, undefined, http).update1(
			id,
			data,
		)
	},
}

/**
 * 节点服务（文件树）
 */
export const NodeService = {
	// 获取文件树
	getFileTree() {
		return NodeControllerApiFactory(undefined, undefined, http).getFileTree()
	},

	// 分页查询节点
	listNodes(params: any = {}) {
		return NodeControllerApiFactory(undefined, undefined, http).page(params)
	},

	// 获取节点详情
	getNodeById(id: number) {
		return NodeControllerApiFactory(undefined, undefined, http).getInfo(id)
	},

	// 添加节点
	addNode(data: any) {
		return NodeControllerApiFactory(undefined, undefined, http).add(data)
	},

	// 更新节点
	updateNode(id: number, data: any) {
		return NodeControllerApiFactory(undefined, undefined, http).update(id, data)
	},

	// 删除节点
	deleteNode(id: number) {
		return NodeControllerApiFactory(undefined, undefined, http).remove(id)
	},
}

/**
 * 问题服务
 */
export const IssueService = {
	// 新增问题
	addIssue(data: any) {
		return IssueControllerApiFactory(undefined, undefined, http).add2(data)
	},

	// 分页查询问题
	listIssues(params: any = {}) {
		return IssueControllerApiFactory(undefined, undefined, http).page2(params)
	},

	// 获取问题详情
	getIssueById(id: number) {
		return IssueControllerApiFactory(undefined, undefined, http).getInfo2(id)
	},

	// 删除问题
	deleteIssue(id: number) {
		return IssueControllerApiFactory(undefined, undefined, http).remove2(id)
	},

	// 更新问题
	updateIssue(id: number, data: any) {
		return IssueControllerApiFactory(undefined, undefined, http).update2(
			id,
			data,
		)
	},
}
