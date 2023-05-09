import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
// import { store, persistor } from './redux/store';

import store from './Redux/store';

import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate
      loading={null}
      persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>
);
