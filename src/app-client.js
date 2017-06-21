/* global window document */

import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Router, browserHistory } from 'react-router'
import { App } from './components/App';

const AppClientReactRouterDOM = () => (
  <Router>
    <App />
  </Router>
);

const AppClientReactRouter = () => (
  <Router routes={App} history={browserHistory}/>
);
window.onload = () => {
  render(<AppClientReactRouter />, document.getElementById('main'));
};

/*
* <Router>
 <App />
 </Router>
* */
