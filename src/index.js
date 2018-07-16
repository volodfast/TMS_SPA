import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./store/reducers.js";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

import history from "./history/history";
import "./index.css";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
