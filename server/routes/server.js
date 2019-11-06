import express from 'express';
import webpack from 'webpack';
import devWebpackConfig from '../../config/webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();

const compiler = webpack(devWebpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: devWebpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    reload: true
}));

app.set('view engine', 'ejs');

app.use('/static', express.static('build'));

export default app;
