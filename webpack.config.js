const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sourceRoot = path.resolve(__dirname, 'src');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
	        filename: 'style.css',
	    })
	],
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		},
		{
	        test: /\.css$/,
	        use: [
	            MiniCssExtractPlugin.loader,
	            "css-loader"
	        ]
        }]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		contentBase: './dist'
	}
};