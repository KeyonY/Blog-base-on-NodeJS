const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// devtool: 'eval-source-map',
	entry: {
		base: ['./src/js/base.js'],
		index: ['./src/js/base.js'],
		admin: ['./src/js/admin/admin.js'],
		blogDetail: ['./src/js/blogDetail.js']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: 'http://localhost:8010/',
		filename: 'scripts/[name].js',
	},
	module: {
		loaders: [
			{test: /\.jade$/,loader: 'jade-loader',options: {pretty: true}},
			{test: /\.css$/,loader: extractTextPlugin.extract({fallback:'style-loader',use:['css-loader']})},
			{test: /\.scss$/,loader: extractTextPlugin.extract({fallback:'style-loader',use:['css-loader','sass-loader']})}
		]
	},
	plugins: [
		new webpack.BannerPlugin('Copyright 2017 Keyon Y'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new extractTextPlugin({filename:'contents/[name].css',disable: false,allChunks:true}),
		new htmlWebpackPlugin()/*{
			template: 'src/views/pages/index.jade',
			filename: './views/index.html',
			inject: false
		}*/
	],
	devServer: {
		// contentBase: '/dist/',	//本地服务器所加载的页面所在的目录
		hot: true,
		historyApiFallback: true,	//不跳转
		inline: true,				//实时刷新
		port: '8010'				//端口号
	}
}