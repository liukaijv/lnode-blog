var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcPath = path.resolve(__dirname, 'backend');
var packageInfo = require('./package.json');

module.exports = {
	entry: path.resolve(srcPath, 'main.js'),
	output:{
		path:'dist',
		filename: '[name]-[hash]-bundle.js'
	},
	resolve: {
        extensions: ['', '.js', '.vue']       
    },  
	module:{
		loaders:[
			{
				test:/\.vue$/,
				loader:'vue'
			},
			{
				test: /\.js?$/,
				loader: 'babel',
				query: {
					presets: ['es2015']					
				},
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},			
			{
				test: /\.(woff2?|eot|ttf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'fonts/[name].[ext]'
				}
			},
			{
				test: /\.(png|jpg|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'images/[name].[ext]'
				}
			}				
		]
	},
	plugins: [       
		new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            title: packageInfo.name
        }),
        new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			"window.$": "jquery",
		})    
    ],   
	devServer: {       
        proxy: {
            "/api/*": {                
                target: "http://localhost:3000",
                changeOrigin: true         
            }
        }
    }
}