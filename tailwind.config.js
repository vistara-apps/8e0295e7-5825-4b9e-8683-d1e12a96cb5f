/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 80%, 50%)',
        accent: 'hsl(180, 70%, 45%)',
        bg: 'hsl(220, 15%, 10%)',
        surface: 'hsl(220, 15%, 15%)',
        'neon-blue': '#00f5ff',
        'neon-purple': '#bf00ff',
        'neon-green': '#00ff88',
        'neon-orange': '#ff8800',
        'neon-pink': '#ff0080',
        neon: {
          blue: '#00f5ff',
          purple: '#bf00ff',
          green: '#00ff88',
          orange: '#ff8800',
          pink: '#ff0080',
        },
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'battle-flash': 'battle-flash 0.5s ease-in-out',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'glow': {
          '0%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'battle-flash': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
