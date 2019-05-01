import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './components/shared/main.scss';
import { Provider } from 'react-redux';
import App from './components/shell/App';
import * as serviceWorker from './serviceWorker';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
