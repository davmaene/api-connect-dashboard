import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import toast, { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <HashRouter>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={true}
    />
  </HashRouter>,
  document.getElementById("root"),
);

serviceWorkerRegistration.register();
reportWebVitals();
