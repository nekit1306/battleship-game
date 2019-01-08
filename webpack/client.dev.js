const webpack = require('webpack');
const helpers      = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PORT = 8081;

module.exports = {
    context: path.join(__dirname, '../client'),
  devtool: 'inline-source-map',
  entry: {
      app: [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?noInfo=false',
        './src/index.js',
        './res/scss/main.scss'
      ]
  },
  output: {
      path: path.join(__dirname, '../build'),
      filename: '.js/bundle.js',
      publicPath: '/',
  },
  devServer: {
      port: PORT,
      historyApiFallback: true,
      hot: true,
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ],
  },
  plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
          template: helpers.root('server/views/index.dev.ejs'),
          inject: 'body',
      }),
      new webpack.DefinePlugin({
          "process.env": { BUILD_TARGET: JSON.stringify("client") },
      }),
  ],
};