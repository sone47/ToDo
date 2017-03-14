const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV;

module.exports = {
  context: __dirname,
	entry: {
    index: './src/js/index.js'
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
		filename: './js/[name].bundle.js'
	},
	module: {
		loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
      test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                require('autoprefixer')
              ];
            }
          }
        }]
      }
    ]
	},
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      title: 'ToDo',
      excludeChunks: ['account']
    }),
    new htmlWebpackPlugin({
      filename: 'account.html',
      template: 'index.html',
      inject: 'body',
      title: 'Account',
      excludeChunks: ['index']
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};