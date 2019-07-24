// webpack 是node写出来，所以要按node的写法
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 打包入口文件
  // devtool: "source-map", // 增加映射文件
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist') // 这个路径必须是一个绝对路径，所以需要用path来解析一下
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  // build 监控，变化自动打包
  // watch: true,
  // watchOptions: { // 监控选项
  //   poll: 1000, // 每秒 watch 1000次
  //   aggregateTimeout: 500, // 防抖
  //   ignored: '/node_modules/' //不需要监控的文件
  // },
  resolve: { // 解析第三方包
  	alias: { // 创建 import 或 require 的别名，来确保模块引入变得更简单。
  		'@': path.resolve(__dirname, 'src')
  	},
  	extensions: ['.js','.css','.json'], // 自动解析确定的扩展 就是没有后缀名时，按这个顺序匹配
  	modules: [path.resolve('node_modules')] //告诉 webpack 解析模块时应该搜索的目录
  },
  module: { // 模块
    noParse: /jquery|lodash/, // 不去解析jquery/lodash的依赖关系
    rules: [
      // loader的顺序 默认是从右往左，从上到下
      // css-loader 解析 @import 这种语法的
      // style-loader 将css引入html的head中
      // {test: /\.css$/, use: ['style-loader','css-loader']}
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
        exclude: '/node_modules',
        include: path.resolve(__dirname,'src'),
        loader: 'babel-loader',
      },
      // {
      // 	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      // 	use: 'file-loader' 
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20*1024, // 小于20k的图片 打包成base64
            name: '[name].[ext]', // 保持名称不变
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
  // 开发服务器的配置 官方文档： https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
    // publicPath: './dist', // 将用于确定应该从哪里提供 bundle，并且此选项优先。 此路径下的打包文件可在浏览器中访问。
    port: 3000, // 端口
    progress: true, // 打包过程
    open: true, // 自动打开浏览器
    // compress: true, // 一切服务都启用 gzip 压缩
    // host: '' , // 指定使用一个 host
    // hot: true, // 启用 webpack 的 模块热替换 功能
    // proxy: { // 代理
    //     '/api': {
    //       target: 'http://localhost:3000',
    //       pathRewrite: {'^/api' : ''}
    //     }
    //   }
    // 前端mock数据 不存在跨域
    // 	before(app) {
    // 	app.get('/api/goods', (req, res) => {
    // 		res.json({
    // 			code: 0,
    // 			list: [
    // 					{id:1,name:'苹果'},
    // 					{id:2,name:'香蕉'}
    // 			]
    // 		})
    // 	})
    // },
  },


  // 配置插件

  plugins: [
    // 开启webpack全局热更新
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'), // 模版路径
      filename: 'index.html', // 打包后的文件名
      title: 'webpack4.0', // 顾名思义，设置生成的 html 文件的标题
      /**  
      	注入选项。有四个选项值 true, body, head, false
      	
      	true 默认值，script标签位于html文件的 
      	body 底部body 同 true
      	head script 标签位于 head 标签内
      	false 不插入生成的 js 文件，只是单纯的生成一个 html 文件
      */
      inject: true,
      // favicon: 'xxx.ico' // 给生成的 html 文件生成一个 favicon
      // minify: { // 压缩
      // 	removeAttributeQuotes: true, // 去掉属性的双引号
      // 	collapseWhitespace: true // 代码压缩成一行
      // },
      hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值
      cahe: true, // 默认值是 true。表示只有在内容变化时才生成一个新的文件
      showErrors: true, // 如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true 

      /**
      	chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
      	chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
      **/
      // chunks: ['index','index2'], 
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/index.css'
    }),
    // 文件头部注入
    new webpack.BannerPlugin('CopyRight by FinGet!'),
    // DefinePlugin 定义一些全局变量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1', // 这是表达式 = 2
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}