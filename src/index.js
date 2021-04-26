import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
import {BrowserRouter as Router} from "react-router-dom"
import store from "./redux/store"
import { Provider } from 'react-redux';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
=======
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>
>>>>>>> 0521a8d8315745668a1954719a5bea843d23a4e3
  </Router>,
  document.getElementById('root')
);

<<<<<<< HEAD
=======
reportWebVitals();
>>>>>>> 0521a8d8315745668a1954719a5bea843d23a4e3
