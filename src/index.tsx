import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { store, persistor } from 'store';
import { ScrollToTop } from 'ui/shared/ScrollToTop/ScrollToTop';
import { App } from 'ui/App';
import { GlobalStyle } from 'globalStyles';
import { theme } from 'theme';
import { Toaster } from 'ui/Toaster';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <ScrollToTop> */}
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <App />
          <Toaster
            autoClose={4000}
            hideProgressBar
            position="bottom-center"
            transition={Slide}
          />
        </>
      </ThemeProvider>
      {/* </ScrollToTop> */}
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
