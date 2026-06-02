export default {
  plugins: {
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'color-functional-notation': true,
        'color-hex-alpha': true,
      },
      browsers: 'defaults, Android >= 4.4, Chrome >= 49, Safari >= 9, iOS >= 9',
    },
  },
}
