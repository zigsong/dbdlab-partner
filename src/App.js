import React from 'react';
import { Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import config from 'modules/config';
import Routes from './Routes';
import './styles/base.scss';

const history = createBrowserHistory();

ReactGA.initialize(config.REACT_APP_GA_ID);

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => (
  <Router history={history}>
    <Routes />
  </Router>
);

export default App;
