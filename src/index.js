import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { allReducers } from "./reducers/allReducers";
import { Provider } from "react-redux";
import GlobalStyle from './comps/GlobalStyle';

import thank from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
  allReducers,
  composeEnchancer(applyMiddleware(thank))
);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

