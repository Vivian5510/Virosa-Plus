import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并多个Tailwind的类名并处理冲突
 * @param inputs 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}

export type ObjectValues<T> = T[keyof T]
