import express from 'express';
import webpack from 'webpack';
import devWebpackConfig from '../../webpack/client.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ssr from './ssr';

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

app.use('/*', ssr);

export default app;
