const webpack = require('webpack');
const helpers      = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 8081;

module.exports = {
  devtool: 'inline-source-map',
  entry: {
      app: [
          'webpack-dev-server/client?http://localhost:8081',
          'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?noInfo=false',
        './client/src/index.js',
        './client/res/scss/main.scss'
      ]
  },
  output: {
      path: helpers.root('build'),
      filename: './static/app.js',
      publicPath: '/'
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
          filename: 'index.html',
          template: helpers.root('server/views/index.dev.ejs'),
          inject: false,
      }),
      new webpack.DefinePlugin({
          "process.env": { BUILD_TARGET: JSON.stringify("client") },
      }),
  ],
};