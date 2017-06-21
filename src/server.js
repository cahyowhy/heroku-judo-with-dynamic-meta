/* eslint no-console: "off"*/

import path from 'path';
import {Server} from 'http';
import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {App} from './components/App';
import {match, RouterContext} from 'react-router'
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';
const app = new Express();
const server = new Server(app);

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering


app.get('*', (req, res) => {
  const context = {};
  let status = 200;
  // const Routes_ = <StaticRouter location={req.url} context={context}><App /></StaticRouter>;
  let reactString;
  const metaTagsInstance = MetaTagsServer();
  try {
    reactString = renderToString(
      <MetaTagsContext extract={metaTagsInstance.extract}>
        <StaticRouter location={req.url} context={context}><App /></StaticRouter>
      </MetaTagsContext>
    );
  }
  catch (e) {
    console.log(e);
    res.status(500).send(e.stack);
    return;
  }

  const meta = metaTagsInstance.renderToString();
  const template = `
            <!doctype html>
            <html lang="en">
            <head>
              <meta charSet="utf-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              ${meta}
              <!-- Bootstrap CSS -->
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous">
              <link rel="stylesheet" href="/css/style.css">

            </head>
            <body>
              <div id="main">${reactString}</div>
              <script src="/js/bundle.js"></script>
            </body>`;
  res.status(status).send(template);
  // return res.status(status).render('index', {template});
});

// start the server
const port = process.env.PORT || 212;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
