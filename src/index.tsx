import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, Store, AnyAction } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from 'redux-observable';
import epic from './store/epic';

import { mainReducer, MainState } from "./store/reducer";

const epicMiddleware = createEpicMiddleware();
const store: Store<MainState, AnyAction> = createStore(mainReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(epic);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
