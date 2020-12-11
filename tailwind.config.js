module.exports = {
  purge: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
    './public/index.html',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      space: ['last'],
    },
  },
  plugins: [],
};
