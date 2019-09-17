import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactBreakpoints from 'react-breakpoints';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';

const breakpoints = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920,
};

ReactDOM.render(
  <ReactBreakpoints breakpoints={breakpoints}>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactBreakpoints>,
  document.querySelector('.wrap'),
);

serviceWorker.unregister();
