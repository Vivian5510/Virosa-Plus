import animate from 'tailwindcss-animate'
import { setupInspiraUI } from '@inspira-ui/plugins'

export default {
	darkMode: 'selector',
	safelist: ['dark'],
	prefix: '',
	content: ['./src/**/*.{js,jsx,ts,tsx,html,vue}'],
	theme: {
		fontFamily: {
			heading: ['Bricolage Grotesque', 'Manrope'],
			sans: ['Manrope'],
			mono: ['monospace'],
		},
		extend: {
			animation: {
				orbit: 'Orbit calc(var(--duration)*1s) linear infinite',
			},
			keyframes: {
				orbit: {
					'0%': {
						transform:
							'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)',
					},
					'100%': {
						transform:
							'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)',
					},
				},
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},

	plugins: [animate, setupInspiraUI],
}
