const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.conf');
const path = require('path');
module.exports = merge(base, {
  mode: 'development',
  // 开发服务器的配置 官方文档： https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"), // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
    // publicPath: './dist', // 将用于确定应该从哪里提供 bundle，并且此选项优先。 此路径下的打包文件可在浏览器中访问。
    port: 3000, // 端口
    progress: true, // 打包过程
    open: true, // 自动打开浏览器
  },
  devtool: 'source-map',
  plugins: [
  // 开启webpack全局热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
})