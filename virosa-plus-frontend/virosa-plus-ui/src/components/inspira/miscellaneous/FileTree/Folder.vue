<template>
	<div class="relative h-full overflow-hidden">
		<div
			class="flex cursor-pointer items-center gap-1 rounded-md text-sm transition-all duration-200"
			:class="[
				cn(
					'flex cursor-pointer items-center gap-1 rounded-md text-sm',
					isSelect && isSelectable ? 'bg-muted' : '',
					!isSelectable ? 'cursor-not-allowed opacity-50' : '',
					$props.class,
				),
			]"
			:dir="direction"
			@click="onTriggerClick"
		>
			<FontAwesomeIcon
				v-if="isExpanded"
				:icon="['fas', 'folder-open']"
				class="h-4 w-4"
			/>
			<FontAwesomeIcon v-else :icon="['fas', 'folder']" class="h-4 w-4" />

			<span class="select-none">{{ name }}</span>
		</div>

		<div v-if="isExpanded" class="relative text-sm">
			<TreeIndicator v-if="name && indicator" aria-hidden="true" />
			<div class="ml-5 flex flex-col gap-1 py-1 rtl:mr-5" :dir="direction">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import {
	type TreeContextProps,
	type FolderProps,
	TREE_CONTEXT_SYMBOL,
} from './index'
import TreeIndicator from '~/components/inspira/miscellaneous/FileTree/TreeIndicator.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import File from '~/components/inspira/miscellaneous/FileTree/File.vue'

const props = withDefaults(defineProps<FolderProps>(), {
	isSelectable: true,
})

const { id, name, isSelectable, isSelect } = toRefs(props)

const treeContext = inject<TreeContextProps>(TREE_CONTEXT_SYMBOL)
if (!treeContext) {
	throw new Error('[Folder] must be used inside <Tree>')
}

const { expandedItems, handleExpand, direction, indicator } = treeContext

const isExpanded = computed<boolean>(() => {
	return !!expandedItems.value?.includes(id.value)
})

function onTriggerClick() {
	if (!isSelectable.value) return
	handleExpand(id.value)
}
</script>
