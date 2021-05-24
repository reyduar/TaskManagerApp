import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./store";
import reduxStore from "./redux/store";

ReactDOM.render(
  <Provider store={reduxStore}>
    <Store>
      <App />
    </Store>
  </Provider>,
  document.getElementById("root")
);
