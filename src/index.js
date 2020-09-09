import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { getJwt } from "Utils/JwtUtil";

import { Provider } from "react-redux";
import { store, persistor } from "Services/Redux/stores/store";
import AdminLayout from "./layouts/Admin.jsx";
import Login from "components/Security/Login";
import AuthenticatedComponent from "components/Security/AuthenticatedComponent";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/css/main.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import "./assets/fonts/Roboto-Regular.ttf";

const hist = createBrowserHistory();

axios.interceptors.request.use(
  (config) => {
    const token = getJwt();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (403 === error.response.status) {
      window.location = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthenticatedComponent>
            <Route path="/" render={(props) => <AdminLayout {...props} />} />
            {/* <Redirect to="/admin/dashboard" /> */}
          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
