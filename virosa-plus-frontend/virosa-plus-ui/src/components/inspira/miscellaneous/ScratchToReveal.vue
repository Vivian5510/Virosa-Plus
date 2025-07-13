<template>
	<Motion
		ref="containerRef"
		:class="cn('relative select-none', props.class)"
		:style="{
			width: containerWidth,
			height: containerHeight,
			cursor: cursorImg,
		}"
		:initial="{
			scale: 1,
			rotate: [0, 10, -10, 10, -10, 0],
		}"
		:transition="{ duration: 0.5 }"
	>
		<canvas
			ref="canvasRef"
			:width="width"
			:height="height"
			class="absolute left-0 top-0 w-full h-full"
			:style="{
				width: containerWidth,
				height: containerHeight,
			}"
			@mousedown="handleMouseDown"
			@touchstart="handleTouchStart"
		/>

		<slot />
	</Motion>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { Motion, useAnimate } from 'motion-v'

const cursorImg =
	"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto"

interface Props {
	class?: string
	width: number
	height: number
	minScratchPercentage?: number
	gradientColors?: [string, string, string]
}

const canvasRef = ref<HTMLCanvasElement>()

const props = withDefaults(defineProps<Props>(), {
	gradientColors: () => ['#A97CF8', '#F38CB8', '#FDCC92'],
	minScratchPercentage: 50,
})

const containerWidth = computed(() => props.width + 'px')
const containerHeight = computed(() => props.height + 'px')

const context = ref<CanvasRenderingContext2D>()

const emit = defineEmits<{
	complete: []
}>()

const isScratching = ref(false)
const isComplete = ref(false)

function handleMouseDown() {
	isScratching.value = true
}
function handleTouchStart() {
	isScratching.value = true
}

const canvasWidth = computed(() => canvasRef.value?.width || props.width)
const canvasHeight = computed(() => canvasRef.value?.height || props.height)

function drawCanvas(canvasRef: Ref<HTMLCanvasElement>) {
	if (!canvasRef.value) return
	
	// 确保canvas尺寸正确设置
	canvasRef.value.width = props.width
	canvasRef.value.height = props.height
	
	context.value = canvasRef.value.getContext('2d')
	if (!context.value) return
	
	// 重置状态
	isComplete.value = false
	isScratching.value = false
	
	// 清除之前的内容
	context.value.clearRect(0, 0, props.width, props.height)
	
	// 重置合成操作
	context.value.globalCompositeOperation = 'source-over'
	
	// 绘制背景
	context.value.fillStyle = '#ccc'
	context.value.fillRect(0, 0, props.width, props.height)
	
	// 创建渐变
	const gradient = context.value.createLinearGradient(
		0,
		0,
		props.width,
		props.height,
	)
	gradient.addColorStop(0, props.gradientColors[0])
	gradient.addColorStop(0.5, props.gradientColors[1])
	gradient.addColorStop(1, props.gradientColors[2])
	
	context.value.fillStyle = gradient
	context.value.fillRect(0, 0, props.width, props.height)
}

function scratch(clientX: number, clientY: number) {
	if (canvasRef.value && context.value) {
		const rect = canvasRef.value.getBoundingClientRect()
		const x = clientX - rect.left + 16
		const y = clientY - rect.top + 16

		context.value.globalCompositeOperation = 'destination-out'
		context.value.beginPath()
		context.value.arc(x, y, 30, 0, Math.PI * 2)
		context.value.fill()
	}
}

function handleDocumentMouseMove(event: MouseEvent) {
	if (!isScratching.value) return
	scratch(event.clientX, event.clientY)
}

function handleDocumentTouchMove(event: TouchEvent) {
	if (!isScratching.value) return
	const touch = event.touches[0]
	scratch(touch.clientX, touch.clientY)
}

function handleDocumentMouseUp() {
	isScratching.value = false
	checkCompletion()
}
function handleDocumentTouchEnd() {
	isScratching.value = false
	checkCompletion()
}

function addEventListeners() {
	// 只监听必要的事件，避免误触发
	document.addEventListener('mousemove', handleDocumentMouseMove)
	document.addEventListener('touchmove', handleDocumentTouchMove)
	document.addEventListener('mouseup', handleDocumentMouseUp)
	document.addEventListener('touchend', handleDocumentTouchEnd)
	document.addEventListener('touchcancel', handleDocumentTouchEnd)
}

function checkCompletion() {
	if (isComplete.value || !isScratching.value) return

	if (canvasRef.value && context.value) {
		try {
			const imageData = context.value.getImageData(
				0,
				0,
				canvasWidth.value,
				canvasHeight.value,
			)
			const pixels = imageData.data
			const totalPixels = pixels.length / 4
			let clearPixels = 0

			for (let i = 3; i < pixels.length; i += 4) {
				if (pixels[i] === 0) {
					clearPixels++
				}
			}

			const percentage = (clearPixels / totalPixels) * 100

			// 调试信息
			console.log(`刮除进度: ${percentage.toFixed(1)}%, 需要: ${props.minScratchPercentage}%`)

			if (percentage >= props.minScratchPercentage) {
				console.log('达到阈值，开始自动清除动画')
				isComplete.value = true
				// 完全清除画布
				context.value.clearRect(0, 0, props.width, props.height)

				startAnimation()
			}
		} catch (error) {
			console.warn('Canvas检查失败:', error)
		}
	}
	isScratching.value = false
}

const [containerRef, animate] = useAnimate()
async function startAnimation() {
	if (!containerRef.value) return
	await animate(containerRef.value, {
		scale: 1,
		rotate: [0, 10, -10, 10, -10, 0],
	}, {
		duration: 0.5,
		ease: 'easeInOut'
	})

	emit('complete')
}

onMounted(() => {
	nextTick(() => {
		if (!canvasRef.value) return

		drawCanvas(canvasRef as Ref<HTMLCanvasElement>)
		addEventListeners()
	})
})

// 监听尺寸变化并重新绘制canvas
watch([() => props.width, () => props.height], () => {
	nextTick(() => {
		if (canvasRef.value) {
			// 重置完成状态
			isComplete.value = false
			drawCanvas(canvasRef as Ref<HTMLCanvasElement>)
		}
	})
})

function removeEventListeners() {
	document.removeEventListener('mousemove', handleDocumentMouseMove)
	document.removeEventListener('touchmove', handleDocumentTouchMove)
	document.removeEventListener('mouseup', handleDocumentMouseUp)
	document.removeEventListener('touchend', handleDocumentTouchEnd)
	document.removeEventListener('touchcancel', handleDocumentTouchEnd)
}
onUnmounted(() => {
	removeEventListeners()
})
</script>

<style></style>
