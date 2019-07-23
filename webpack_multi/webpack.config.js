const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');

// console.log(HtmlWebpackPlugin)

let htmlPluginArray = []
function getEntry() {
  const entry = {};
  //读取src目录所有page入口
  glob.sync('./src/pages/*/*.js')
      .forEach(function (filePath) {
          var name = filePath.match(/\/pages\/(.+)\/*.js/);
          // console.log(name);
          name = name[1].replace(/\/.+/,'');
          // console.log(name);
          entry[name] = filePath;

        // 实例化插件
        htmlPluginArray.push(new HtmlWebpackPlugin({
        	filename: `./${name}/${name}.html`,
         	template: './src/pages/' + name + '/'+name+'.html',
          title: `${name}`,
         	chunks: [name]
        }))

      });
  return entry;
};
let entry = getEntry();

module.exports = {
	mode: 'development',
	// 多入口
	entry: entry,
	output: {
		filename: '[name]/[name].js',
		path: path.resolve(__dirname,'dist')
	},
	optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
	module: { // 模块
		rules: [
			{test: /\.(css|less)$/, 
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
	devServer: {
		contentBase: path.resolve(__dirname, "dist"), // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
		// publicPath: './dist', // 将用于确定应该从哪里提供 bundle，并且此选项优先。 此路径下的打包文件可在浏览器中访问。
		port: 3000, // 端口
		progress: true, // 打包过程
		open: true, // 自动打开浏览器
	},
	plugins: [
		...htmlPluginArray,
		new MiniCssExtractPlugin({
			filename: '[name]/[name].css'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}

