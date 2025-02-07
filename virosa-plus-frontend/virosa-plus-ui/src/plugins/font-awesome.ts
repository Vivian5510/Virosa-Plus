// src/plugins/font-awesome.ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 引入需要的图标
import {
	faFolder,
	faFolderOpen,
	faFileArchive,
	faFile,
	faChevronDown,
	faChevronLeft,
	faChevronRight,
	faBookOpen,
} from '@fortawesome/free-solid-svg-icons'

// 添加到库中
library.add(
	faBookOpen,
	faChevronDown,
	faChevronRight,
	faChevronLeft,
	faFile,
	faFileArchive,
	faFolder,
	faFolderOpen,
)

export { FontAwesomeIcon }
