const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const BrotliPlugin = require('brotli-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  productionSourceMap: !IS_PROD,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
              @import "~@/styles/mixins.scss";
              @import "~@/styles/variables.scss";
              `,
      },
    },
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: (config) => {
    const plugins = [];
    if (IS_PROD) {
      // 生产环境 压缩去除警告 调试 以及console
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = false;
      // Zopfli 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          },
          compressionOptions: {
            numiterations: 15,
          },
          minRatio: 0.99,
          test: productionGzipExtensions,
        })
      );
      plugins.push(
        new BrotliPlugin({
          test: productionGzipExtensions,
          minRatio: 0.99,
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@styles', resolve('src/styles'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'));
    /* config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 102400//100kb以下返回dataUrl
        return options
      }) */
    config.module
      .rule('svgSprite')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
  },
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
};
