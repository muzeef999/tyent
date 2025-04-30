// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',  // Include TypeScript files in your pages
    './components/**/*.{ts,tsx}', // Include TypeScript files in your components
    './src/**/*.{ts,tsx}', // If you have a src directory
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors : {
        primary: '#008ac7',
        secondary: '#00b4d8',
        input: '#e0f7fa',
        darkPrimary: '#005f8b',
        darkSecondary: '#0091c6',
        darkInput: '#004d6a',
      }
    },
  },
  plugins: [],
};
