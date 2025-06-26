import axios from 'axios'
import toast from './toast'
import { AjaxResult } from '../api/types'
import {
	ArticleControllerApiFactory,
	IssueControllerApiFactory,
	MessageControllerApiFactory,
	NodeControllerApiFactory,
	DefaultApiFactory,
} from '../api/generated'

// 创建axios实例
export const http = axios.create({
	baseURL: '', // 不设置baseURL，使用相对路径，让代理正常工作
})

// 使用OpenAPI生成的API工厂
export const articleApi = ArticleControllerApiFactory(
	undefined,
	undefined,
	http,
)
export const issueApi = IssueControllerApiFactory(undefined, undefined, http)
export const messageApi = MessageControllerApiFactory(
	undefined,
	undefined,
	http,
)
export const nodeApi = NodeControllerApiFactory(undefined, undefined, http)
export const defaultApi = DefaultApiFactory(undefined, undefined, http)

// 添加请求拦截器
http.interceptors.request.use(
	function (config) {
		console.log('发送请求:', config.method?.toUpperCase(), config.url)
		// 在发送请求之前做些什么
		return config
	},
	function (error) {
		console.error('请求错误:', error)
		toast.warning(error.message ?? '未知请求错误')
		// 对请求错误做些什么
		return Promise.reject(error)
	},
)

// 添加响应拦截器
http.interceptors.response.use(
	function (response) {
		console.log('收到响应:', response.config.url)
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据进行格式化
		if (response.data) {
			return response.data
		}
		return response
	},
	function (error) {
		console.error('响应错误:', error.config?.url, error.message)

		const status = error.response?.status
		const responseData = error.response?.data as AjaxResult | undefined
		let msg = ''

		if (responseData && responseData.msg) {
			msg = responseData.msg
		}

		if (!msg) {
			switch (status) {
				case 400:
					msg = '参数错误'
					break
				case 500:
					msg = '服务端错误'
					break
				case 404:
					msg = '路由未找到'
					break
				default:
					msg = error.message ?? '未知响应错误'
					break
			}
		}

		toast.warning(msg)
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error)
	},
)
