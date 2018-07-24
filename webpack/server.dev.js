const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const helpers      = require('./helpers');

module.exports = {
  context: helpers.root('server'),
  entry: [
      'webpack/hot/poll?1000',
    './routes/index.js',
  ],
  watch: true,
  target: 'node',
  output: {
    path: helpers.root('build'),
    filename: './server.js',
  },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-1'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              emitFile: false,
            }  
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        "process.env": { BUILD_TARGET: JSON.stringify("server") },
    }),
  ]
};
