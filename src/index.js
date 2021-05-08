import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./redux/store"
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from "./redux/store"

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById('root')
);


