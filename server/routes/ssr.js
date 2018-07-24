import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducers from '../../client/src/reducers/index';
import thunk from 'redux-thunk';
import App from '../../client/src/app';

const router = express.Router();

router.get('/', (req, res) => {
  /*
    http://redux.js.org/docs/recipes/ServerRendering.html
  */
  const store = createStore(reducers, applyMiddleware(thunk));

  const context = {};

  const application = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.originalUrl}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  );

  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    const html = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>React ExpressJS</title>
        <meta name="description" content="" />
      
        <meta name="Robots" content="INDEX,ALL" />
        <meta name="YahooSeeker" content="INDEX, FOLLOW" />
        <meta name="msnbot" content="INDEX, FOLLOW" />
        <meta name="googlebot" content="INDEX, FOLLOW" />
        <meta name="allow-search" content="yes" />
        <meta name="revisit-after" content="daily" />
        <meta name="Rating" content="General" />
        <meta name="site" content="https://www.example.com" />
        <meta name="distribution" content="global" />
        <meta name="Copyright" content="" />
        <meta name="theme-color" content="#0e5354" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
      </head>
      
      <body>
        <div id="reactbody">
          <div>
            ${application}
          </div>
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}
        </script>
        <script src='/static/app.js'></script>
        <script src="https://use.fontawesome.com/562f4bc857.js"></script>
      </body>
      </html>`;
    res.send(html);
  }
});


export default router;
