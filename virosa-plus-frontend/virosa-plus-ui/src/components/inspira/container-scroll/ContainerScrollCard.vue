<template>
	<div
		:style="{
			transform: `rotateX(${rotate}deg) scale(${scale})`,
			boxShadow:
				'0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
		}"
		class="mx-auto h-[30rem] max-w-5xl w-full border-4 border-[#6C6C6C] rounded-[30px] bg-[#222222] p-2 shadow-2xl -mt-12 md:h-[40rem] md:p-6"
	>
		<div
			class="size-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl dark:bg-zinc-900 md:p-4"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	rotate: Number,
	scale: Number,
})
</script>
