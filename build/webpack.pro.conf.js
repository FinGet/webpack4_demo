const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(base, {
	mode: 'production',
	optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
  	// 文件头部注入
    new webpack.BannerPlugin('CopyRight by FinGet!')
  ]
})