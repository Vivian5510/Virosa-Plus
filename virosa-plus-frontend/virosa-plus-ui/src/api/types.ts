/**
 * 自定义API类型定义
 *
 * 此文件包含与后端API交互所需的自定义类型定义
 */

/**
 * 统一响应结果类型
 * 与后端AjaxResult保持一致
 */
export interface AjaxResult {
	/**
	 * 错误码，通常为 0 或 200 表示成功，非 0 表示错误类型
	 */
	code: number

	/**
	 * 返回的数据内容
	 */
	data: any

	/**
	 * 返回的消息，一般用于提示用户
	 */
	msg: string
}
