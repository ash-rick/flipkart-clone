import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import Routers from './Routers';
import reportWebVitals from './reportWebVitals';
import store from 'redux/store/store';
import { ToastContainer} from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Routers />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
