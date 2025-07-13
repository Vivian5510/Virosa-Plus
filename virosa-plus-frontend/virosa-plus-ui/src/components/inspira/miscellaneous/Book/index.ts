export const BOOK_RADIUS_MAP = {
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
} as const

export const BOOK_SIZE_MAP = {
	sm: { width: '180px', spineTranslation: '152px' },
	md: { width: '220px', spineTranslation: '192px' },
	lg: { width: '260px', spineTranslation: '232px' },
	xl: { width: '300px', spineTranslation: '272px' },
} as const

export const BOOK_SHADOW_SIZE_MAP = {
	sm: '-5px 0 15px 5px var(--shadowColor)',
	md: '-7px 0 25px 7px var(--shadowColor)',
	lg: '-10px 0 35px 10px var(--shadowColor)',
	xl: '-12px 0 45px 12px var(--shadowColor)',
} as const

export const BOOK_COLOR_MAP = {
	slate: {
		from: 'from-slate-900',
		to: 'to-slate-700',
		lightFrom: '#64748b',
		mainFrom: '#475569',
		mainTo: '#334155',
		darkTo: '#1e293b',
	},
	gray: {
		from: 'from-gray-900',
		to: 'to-gray-700',
		lightFrom: '#6b7280',
		mainFrom: '#4b5563',
		mainTo: '#374151',
		darkTo: '#1f2937',
	},
	zinc: {
		from: 'from-zinc-900',
		to: 'to-zinc-700',
		lightFrom: '#71717a',
		mainFrom: '#52525b',
		mainTo: '#3f3f46',
		darkTo: '#27272a',
	},
	neutral: {
		from: 'from-neutral-900',
		to: 'to-neutral-700',
		lightFrom: '#737373',
		mainFrom: '#525252',
		mainTo: '#404040',
		darkTo: '#262626',
	},
	stone: {
		from: 'from-stone-900',
		to: 'to-stone-700',
		lightFrom: '#78716c',
		mainFrom: '#57534e',
		mainTo: '#44403c',
		darkTo: '#292524',
	},
	red: {
		from: 'from-red-900',
		to: 'to-red-700',
		lightFrom: '#ef4444',
		mainFrom: '#dc2626',
		mainTo: '#b91c1c',
		darkTo: '#7f1d1d',
	},
	orange: {
		from: 'from-orange-900',
		to: 'to-orange-700',
		lightFrom: '#f97316',
		mainFrom: '#ea580c',
		mainTo: '#c2410c',
		darkTo: '#9a3412',
	},
	amber: {
		from: 'from-amber-900',
		to: 'to-amber-700',
		lightFrom: '#f59e0b',
		mainFrom: '#d97706',
		mainTo: '#b45309',
		darkTo: '#92400e',
	},
	yellow: {
		from: 'from-yellow-900',
		to: 'to-yellow-700',
		lightFrom: '#eab308',
		mainFrom: '#ca8a04',
		mainTo: '#a16207',
		darkTo: '#854d0e',
	},
	lime: {
		from: 'from-lime-900',
		to: 'to-lime-700',
		lightFrom: '#84cc16',
		mainFrom: '#65a30d',
		mainTo: '#4d7c0f',
		darkTo: '#365314',
	},
	green: {
		from: 'from-green-900',
		to: 'to-green-700',
		lightFrom: '#22c55e',
		mainFrom: '#16a34a',
		mainTo: '#15803d',
		darkTo: '#14532d',
	},
	emerald: {
		from: 'from-emerald-900',
		to: 'to-emerald-700',
		lightFrom: '#10b981',
		mainFrom: '#059669',
		mainTo: '#047857',
		darkTo: '#064e3b',
	},
	teal: {
		from: 'from-teal-900',
		to: 'to-teal-700',
		lightFrom: '#14b8a6',
		mainFrom: '#0d9488',
		mainTo: '#0f766e',
		darkTo: '#134e4a',
	},
	cyan: {
		from: 'from-cyan-900',
		to: 'to-cyan-700',
		lightFrom: '#06b6d4',
		mainFrom: '#0891b2',
		mainTo: '#0e7490',
		darkTo: '#164e63',
	},
	sky: {
		from: 'from-sky-900',
		to: 'to-sky-700',
		lightFrom: '#0ea5e9',
		mainFrom: '#0284c7',
		mainTo: '#0369a1',
		darkTo: '#0c4a6e',
	},
	blue: {
		from: 'from-blue-900',
		to: 'to-blue-700',
		lightFrom: '#3b82f6',
		mainFrom: '#2563eb',
		mainTo: '#1d4ed8',
		darkTo: '#1e3a8a',
	},
	indigo: {
		from: 'from-indigo-900',
		to: 'to-indigo-700',
		lightFrom: '#6366f1',
		mainFrom: '#4f46e5',
		mainTo: '#4338ca',
		darkTo: '#312e81',
	},
	violet: {
		from: 'from-violet-900',
		to: 'to-violet-700',
		lightFrom: '#8b5cf6',
		mainFrom: '#7c3aed',
		mainTo: '#6d28d9',
		darkTo: '#4c1d95',
	},
	purple: {
		from: 'from-purple-900',
		to: 'to-purple-700',
		lightFrom: '#a855f7',
		mainFrom: '#9333ea',
		mainTo: '#7e22ce',
		darkTo: '#581c87',
	},
	fuchsia: {
		from: 'from-fuchsia-900',
		to: 'to-fuchsia-700',
		lightFrom: '#d946ef',
		mainFrom: '#c026d3',
		mainTo: '#a21caf',
		darkTo: '#701a75',
	},
	pink: {
		from: 'from-pink-900',
		to: 'to-pink-700',
		lightFrom: '#ec4899',
		mainFrom: '#db2777',
		mainTo: '#be185d',
		darkTo: '#831843',
	},
	rose: {
		from: 'from-rose-900',
		to: 'to-rose-700',
		lightFrom: '#f43f5e',
		mainFrom: '#e11d48',
		mainTo: '#be123c',
		darkTo: '#881337',
	},
} as const

export type BookColor = keyof typeof BOOK_COLOR_MAP
export type BookSize = keyof typeof BOOK_SIZE_MAP
export type BookRadius = keyof typeof BOOK_RADIUS_MAP
export type BookShadowSize = keyof typeof BOOK_SHADOW_SIZE_MAP

export { default as Book } from './Book.vue'
export { default as BookHeader } from './BookHeader.vue'
export { default as BookTitle } from './BookTitle.vue'
export { default as BookDescription } from './BookDescription.vue'
