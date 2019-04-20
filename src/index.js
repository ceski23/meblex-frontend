import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './styles/main.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
