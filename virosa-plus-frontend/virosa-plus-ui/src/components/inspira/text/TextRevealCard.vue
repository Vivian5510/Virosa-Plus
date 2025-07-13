<template>
	<div
		ref="cardRef"
		:class="[
			'group relative w-full max-w-[40rem] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#2a2a2d] via-[#1e1e21] to-[#2a2a2d] p-2 md:p-4 sm:p-3 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm',
			'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-white/[0.02] before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500',
			props.class,
		]"
		@mouseenter="mouseEnterHandler"
		@mouseleave="mouseLeaveHandler"
		@mousemove="mouseMoveHandler"
		@touchstart="mouseEnterHandler"
		@touchend="mouseLeaveHandler"
		@touchmove="touchMoveHandler"
	>
		<slot name="header"></slot>
		<div class="relative h-40 flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20">
			<div
				:style="{
					width: '100%',
					height: '100%',
					opacity: widthPercentage > 0 ? 1 : 0,
					clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
					transition: isMouseOver ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				}"
				class="absolute inset-0 z-30 bg-gradient-to-br from-[#2a2a2d] via-[#1e1e21] to-[#2a2a2d] will-change-transform flex items-center backdrop-blur-sm"
			>
				<slot name="text" />
			</div>

			<div
				:style="{
					left: `${widthPercentage}%`,
					transform: `rotate(${rotateDeg}deg)`,
					opacity: widthPercentage > 0 ? 1 : 0,
					transition: isMouseOver ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				}"
				class="absolute z-50 h-40 w-[3px] from-transparent via-blue-400 to-transparent bg-gradient-to-b will-change-transform shadow-lg shadow-blue-400/50"
			>
				<!-- 添加发光效果 -->
				<div class="absolute inset-0 w-[1px] left-1/2 transform -translate-x-1/2 bg-white/90 shadow-lg shadow-white/50"></div>
			</div>

			<div
				class="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] overflow-hidden flex items-center"
			>
				<div class="relative w-full">
					<slot name="revealText"></slot>
					<!-- 添加光晕效果 -->
					<div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg blur-xl"></div>
				</div>

				<TextRevealStars :stars-count="starsCount" :class="starsClass" />
			</div>
		</div>
		
		<!-- 添加底部装饰线 -->
		<div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
		
		<!-- 添加角落装饰 -->
		<div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
	</div>
</template>

<script setup lang="ts">
import TextRevealStars from '~/components/inspira/text/TextRevealStars.vue'

interface Props {
	class?: string
	starsCount?: number
	starsClass?: string
}
const props = withDefaults(defineProps<Props>(), {
	class: '',
	starsCount: 130,
})

const cardRef = ref<HTMLElement | null>(null)
const widthPercentage = ref(0)
const left = ref(0)
const localWidth = ref(0)
const isMouseOver = ref(false)

const rotateDeg = computed(() => (widthPercentage.value - 50) * 0.1)

onMounted(() => {
	if (cardRef.value) {
		const rect = cardRef.value.getBoundingClientRect()
		left.value = rect.left
		localWidth.value = rect.width
	}

	window.addEventListener('resize', updateMeasurements)
})

function updateMeasurements() {
	if (cardRef.value) {
		const rect = cardRef.value.getBoundingClientRect()
		left.value = rect.left
		localWidth.value = rect.width
	}
}

function mouseMoveHandler(event: MouseEvent) {
	event.preventDefault()
	if (cardRef.value) {
		const rect = cardRef.value.getBoundingClientRect() // Get current position
		const relativeX = event.clientX - rect.left
		widthPercentage.value = (relativeX / rect.width) * 100
	}
}

function mouseLeaveHandler() {
	isMouseOver.value = false
	setTimeout(() => {
		if (!isMouseOver.value) {
			widthPercentage.value = 0
		}
	}, 100)
}

function mouseEnterHandler() {
	isMouseOver.value = true
}

function touchMoveHandler(event: TouchEvent) {
	event.preventDefault()
	if (cardRef.value) {
		const rect = cardRef.value.getBoundingClientRect()
		const relativeX = event.touches[0]!.clientX - rect.left
		widthPercentage.value = (relativeX / rect.width) * 100
	}
}
</script>

<style scoped>
/* 增强悬停效果 */
.group:hover {
	transform: translateY(-2px);
}

/* 自定义滚动条 */
.group::-webkit-scrollbar {
	width: 4px;
}

.group::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 2px;
}

.group::-webkit-scrollbar-thumb {
	background: linear-gradient(180deg, #3b82f6, #8b5cf6);
	border-radius: 2px;
}

/* 添加细微的发光动画 */
@keyframes glow-pulse {
	0%, 100% {
		box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
	}
	50% {
		box-shadow: 0 0 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1);
	}
}

.group:hover {
	animation: glow-pulse 3s ease-in-out infinite;
}

/* 优化移动端体验 */
@media (max-width: 768px) {
	.group {
		transform: none !important;
	}
	
	.group:hover {
		transform: none !important;
		animation: none !important;
	}
}

/* 提升文字对比度 */
.group:deep(.bg-clip-text) {
	-webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.1);
}
</style>
