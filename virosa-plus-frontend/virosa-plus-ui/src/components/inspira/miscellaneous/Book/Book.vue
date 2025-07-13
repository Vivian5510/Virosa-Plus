<template>
	<div
		:class="
			cn(
				'z-10 group [perspective:800px] w-min',
				$props.class,
			)
		"
	>
		<div
			:style="{
				width: sizeMap[size].width,
				transition: `transform ${props.duration}ms ease`,
			}"
			:class="[
				'relative aspect-[3/4] [transform-style:preserve-3d]',
				isStatic
					? '[transform:rotateY(-30deg)]'
					: '[transform:rotateY(0deg)] group-hover:[transform:rotateY(-30deg)]',
				radiusMap[radius],
			]"
		>
			<div
				:class="`
          absolute inset-y-0 overflow-hidden size-full left-0
          text-white flex flex-col justify-end p-6
          bg-gradient-to-tr border border-white/10
          ${computedGradient.from}
          ${computedGradient.to}
          ${radiusMap[radius]}
        `"
				:style="{
					transform: 'translateZ(25px)',
					background: `linear-gradient(135deg, ${computedGradient.lightFrom} 0%, ${computedGradient.mainFrom} 30%, ${computedGradient.mainTo} 70%, ${computedGradient.darkTo} 100%)`,
					boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)',
				}"
			>
				<!-- 书页纹理效果 -->
				<div
					class="absolute left-0 top-0 h-full"
					:style="{
						minWidth: '8.2%',
						background:
							'linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 12%, hsla(0, 0%, 100%, .35) 29.25%, hsla(0, 0%, 100%, 0) 50.5%, hsla(0, 0%, 100%, 0) 75.25%, hsla(0, 0%, 100%, .35) 91%, hsla(0, 0%, 100%, 0)), linear-gradient(90deg, rgba(0, 0, 0, .05), rgba(0, 0, 0, .15) 12%, transparent 30%, rgba(0, 0, 0, .03) 50%, rgba(0, 0, 0, .25) 73.5%, rgba(0, 0, 0, .6) 75.25%, rgba(0, 0, 0, .2) 85.25%, transparent)',
						opacity: '0.3',
					}"
				></div>
				
				<!-- 顶部高光 -->
				<div
					class="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
				></div>
				
				<!-- 左侧高光 -->
				<div
					class="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/15 to-transparent"
				></div>
				
				<!-- hover状态光泽效果 -->
				<div
					class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent"
				></div>
				<div class="pl-1">
					<slot />
				</div>
			</div>

			<div
				class="absolute left-0"
				:style="{
					top: '3px',
					bottom: '3px',
					width: '48px',
					transform:
						'translateX(' + sizeMap[size].spineTranslation + ') rotateY(90deg)',
					background:
						'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,1) 20%, rgba(220,220,220,1) 50%, rgba(200,200,200,1) 80%, rgba(180,180,180,0.9) 100%)',
					borderLeft: '1px solid rgba(0,0,0,0.1)',
					borderRight: '1px solid rgba(255,255,255,0.3)',
				}"
			></div>

			<div
				:class="`
          absolute inset-y-0 overflow-hidden size-full left-0
          text-white flex flex-col justify-end p-6
          bg-gradient-to-tr border border-black/20
          ${computedGradient.from}
          ${computedGradient.to}
          ${radiusMap[radius]}
        `"
				:style="{
					transform: 'translateZ(-25px)',
					background: `linear-gradient(135deg, ${computedGradient.darkTo} 0%, ${computedGradient.mainTo} 50%, ${computedGradient.mainFrom} 100%)`,
					opacity: '0.8',
				}"
			>
				<!-- 背面纹理 -->
				<div
					class="absolute inset-0 opacity-20"
					:style="{
						background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
					}"
				></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import {
	BOOK_RADIUS_MAP as radiusMap,
	BOOK_SIZE_MAP as sizeMap,
	BOOK_COLOR_MAP as colorMap,
	BOOK_SHADOW_SIZE_MAP as shadowSizeMap,
	type BookRadius,
	type BookSize,
	type BookColor,
	type BookShadowSize,
} from './index'

interface BookProps {
	class?: HTMLAttributes['class']
	color?: BookColor
	duration?: number
	isStatic?: boolean
	radius?: BookRadius
	shadowSize?: BookShadowSize
	size?: BookSize
}

const props = withDefaults(defineProps<BookProps>(), {
	duration: 1000,
	color: 'red',
	isStatic: false,
	size: 'md',
	radius: 'md',
	shadowSize: 'lg',
})

const computedGradient = computed(() => {
	return colorMap[props.color] || colorMap.zinc
})
</script>
