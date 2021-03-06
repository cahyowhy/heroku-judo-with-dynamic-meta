import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import App from './src/components/App';

import MetaTagsServer from '../src/meta_tags_server';
import {MetaTagsContext} from '../src/index';

const app = express();

app.use((req, res) => {
  match({
    routes: App, location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let reactString;
      const metaTagsInstance = MetaTagsServer();

      try {
        reactString = ReactDomServer.renderToString(
          <MetaTagsContext extract={metaTagsInstance.extract}>
            <RouterContext {...renderProps}/>
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

            </head>
            <body>
              <div id="main">${reactString}</div>
            </body>
          `;

      res.status(200).send(template)
    } else {
      res.status(301).redirect('/')
    }
  });
});
