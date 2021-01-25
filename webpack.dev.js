const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: '/',
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 8080,
    overlay: { // 浏览器中显示警告和错误：
      errors: true
      // warnings: true
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})
