module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-ba':
          'linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);',
        'header-gradient':
          'linear-gradient(180deg, rgba(0,0,0,0.29175420168067223) 55%, rgba(4,4,4,0.01) 100%)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
}
