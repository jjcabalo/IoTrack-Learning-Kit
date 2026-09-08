/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        brand: {
          DEFAULT: 'var(--brand)',
          foreground: 'var(--brand-foreground)',
          2: 'var(--brand-2)',
        },
        'accent-glow': 'var(--accent-glow)',
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-cool': 'var(--gradient-cool)',
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        soft: 'var(--shadow-soft)',
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        servo: 'servo-sweep 5s ease-in-out infinite',
        gripper: 'gripper 2s ease-in-out infinite',
        scan: 'scan 2.5s ease-in-out infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 30px) scale(0.95)' },
        },
        'servo-sweep': {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        gripper: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(3px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '20%, 80%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      }
    }
  },
  plugins: [],
}
