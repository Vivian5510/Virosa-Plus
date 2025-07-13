<template>
	<figure
		class="relative w-48 cursor-pointer overflow-hidden border border-gray-950/[.1] rounded-xl bg-gray-950/[.01] p-3 md:w-64 sm:w-56 dark:border-gray-50/[.1] dark:bg-gray-50/[.10] hover:bg-gray-950/[.05] sm:p-4 dark:hover:bg-gray-50/[.15]"
	>
		<div class="flex flex-row items-center gap-2">
			<img :src="img" class="h-8 w-8 rounded-full" alt="" />
			<div class="flex flex-col">
				<span class="text-xs font-medium sm:text-sm dark:text-white">
					{{ name }}
				</span>
				<p class="text-xs font-medium dark:text-white/40">{{ username }}</p>
			</div>
		</div>
		<blockquote class="mt-2 text-xs leading-relaxed sm:text-sm">
			{{ body }}
		</blockquote>
	</figure>
</template>

<script lang="ts" setup>
interface Props {
	img: string
	name: string
	username: string
	body: string
}

defineProps<Props>()
</script>
