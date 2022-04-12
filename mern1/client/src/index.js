import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import {Provider} from 'react-redux'
import store from './Store';



ReactDOM.render(

  <Provider store={store}>
  
 
    <App/>
  

  </Provider>

  ,
  document.getElementById('root')
);
