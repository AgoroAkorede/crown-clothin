import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import store from './redux/user/store'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './redux/user/store'

import App from './App';
// const HatsPage = () => {
//   <div>
//     <h1>HatsPage</h1>
//   </div> 
// }


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);

