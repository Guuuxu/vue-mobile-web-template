module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-preset-env': {
      stage: 0,
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: true,
      replace: true,
      exclude: /(\/|\\)(node_modules)(\/|\\)/,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    },
    cssnano: {
      preset: 'default',
    },
  },
};
