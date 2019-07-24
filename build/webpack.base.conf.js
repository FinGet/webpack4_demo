const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname,'../src/index.js'), // 打包入口文件
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, '../dist') // 这个路径必须是一个绝对路径，所以需要用path来解析一下
  },
  module: { // 模块
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: 'assets/images' // 打包后的存放路径
          }
        }
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  },

  // 配置插件

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模版路径
      filename: 'index.html', // 打包后的文件名
      title: 'webpack4.0', // 顾名思义，设置生成的 html 文件的标题
      inject: true,
      hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值
      cahe: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
      showErrors: true, // 如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true 
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/index.css'
    })
  ]
}