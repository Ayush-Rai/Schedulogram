import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
