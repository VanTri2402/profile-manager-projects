/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		animation: {
  			'fade-in': 'fadeIn 0.3s ease-out forwards'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			}
  		},
  		colors: {
  			primary: {
  				'50': '#FEF2F2',
  				'100': '#FEE2E2',
  				'200': '#FECACA',
  				'300': '#FCA5A5',
  				'400': '#F87171',
  				'500': '#EF4444',
  				'600': '#DC2626',
  				'700': '#B91C1C',
  				'800': '#991B1B',
  				'900': '#7F1D1D',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			gray: {
  				'750': '#2e2e2e',
  				'800': '#1F2937',
  				'900': '#1F2937'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			navbar: {
  				DEFAULT: '#FFFFFF',
  				secondary: '#F3F4F6'
  			},
  			text: {
  				DEFAULT: '#1F2937',
  				secondary: '#374151',
  				muted: '#6B7280',
  				white: '#FFFFFF',
  				indigo: '#A5B4FC',
  				gray: '#F3F4F6'
  			},
  			hover: {
  				DEFAULT: '#DC2626',
  				secondary: '#E5E7EB'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				purple: '#8B5CF6',
  				blue: '#06B6D4',
  				orange: '#F97316',
  				indigo: '#818CF8',
  				indigoMidnight: '#A5B4FC',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			success: {
  				DEFAULT: '#10B981'
  			},
  			error: {
  				DEFAULT: '#EF4444'
  			},
  			warning: {
  				DEFAULT: '#F59E0B'
  			},
  			sage: {
  				'50': '#F3F7F3',
  				'100': '#E3ECE3',
  				'200': '#D1E1D1',
  				'300': '#BED6BE',
  				'400': '#A9CBA9',
  				'500': '#94BF94',
  				'600': '#7DA37D',
  				'700': '#658765',
  				'800': '#4D6C4D',
  				'900': '#355135'
  			},
  			'sage-text': {
  				light: '#355135',
  				DEFAULT: '#1F2937',
  				dark: '#000000',
  				muted: '#6B7280'
  			},
  			'sage-hover': {
  				light: '#BED6BE',
  				DEFAULT: '#A9CBA9',
  				dark: '#94BF94'
  			},
  			'sage-border': {
  				light: '#E3ECE3',
  				DEFAULT: '#D1E1D1',
  				dark: '#BED6BE'
  			},
  			gradient: {
  				from: '#EF4444',
  				via: '#F97316',
  				to: '#F59E0B'
  			},
  			'red-orange': {
  				'50': '#FFF7ED',
  				'100': '#FFEDD5',
  				'200': '#FED7AA',
  				'300': '#FDBA74',
  				'400': '#FB923C',
  				'500': '#F97316',
  				'600': '#EA580C',
  				'700': '#C2410C',
  				'800': '#9A3412',
  				'900': '#7C2D12'
  			},
  			'pink-gradient': {
  				'50': '#FCCBF0',
  				'100': '#FF5A57',
  				'200': '#E02F75',
  				'300': '#6700A3'
  			},
  			darkModern: {
  				sidebar: 'rgba(31, 41, 55, 0.9)',
  				card: 'rgba(31, 41, 55, 0.9)',
  				button: {
  					from: '#4F46E5',
  					to: '#7C3AED'
  				},
  				buttonHover: {
  					from: '#4338CA',
  					to: '#6D28D9'
  				},
  				text: '#FFFFFF',
  				textSecondary: '#A5B4FC',
  				border: 'rgba(75, 85, 99, 0.5)',
  				accent: '#818CF8'
  			},
  			midnightModern: {
  				sidebar: 'rgba(31, 41, 55, 0.9)',
  				card: 'rgba(31, 41, 55, 0.9)',
  				button: {
  					from: '#6366F1',
  					to: '#A78BFA'
  				},
  				buttonHover: {
  					from: '#4F46E5',
  					to: '#7C3AED'
  				},
  				text: '#F3F4F6',
  				textSecondary: '#C7D2FE',
  				border: 'rgba(75, 85, 99, 0.5)',
  				accent: '#A5B4FC'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				md: '3rem',
  				lg: '4rem'
  			},
  			screens: {
  				sm: '640px',
  				md: '768px',
  				lg: '1024px',
  				xl: '1280px',
  				'2xl': '1536px'
  			}
  		},
  		boxShadow: {
  			dark: '0 2px 4px rgba(0, 0, 0, 0.1)',
  			'dark-lg': '0 4px 6px rgba(0, 0, 0, 0.1)',
  			'dark-xl': '0 10px 15px rgba(0, 0, 0, 0.1)',
  			glow: '0 0 20px rgba(239, 68, 68, 0.2)',
  			'glow-orange': '0 0 20px rgba(249, 115, 22, 0.2)',
  			'glow-purple': '0 0 20px rgba(139, 92, 246, 0.2)',
  			'glow-pink': '0 0 20px rgba(224, 47, 117, 0.3)'
  		},
  		backgroundImage: {
  			'gradient-red-orange': 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
  			'gradient-red-orange-amber': 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #F59E0B 100%)',
  			'gradient-pink-purple': 'linear-gradient(to top, #FCCBF0 0%, #FF5A57 33%, #E02F75 66%, #6700A3 100%)',
  			'gradient-pink-purple-light': 'linear-gradient(to top, rgba(252, 203, 240, 0.8) 0%, rgba(255, 90, 87, 0.8) 33%, rgba(224, 47, 117, 0.8) 66%, rgba(103, 0, 163, 0.8) 100%)',
  			'gradient-dark-modern': 'linear-gradient(135deg, #0F172A 0%, #5B21B6 50%, #0F172A 100%)',
  			'gradient-midnight-modern': 'linear-gradient(135deg, #1F2937 0%, #3730A3 50%, #1F2937 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  extend: {
      // ... các extend khác
      keyframes: { // Thêm keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: { // Thêm animation
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
};
