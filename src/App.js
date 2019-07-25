import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import BaseRouter from "./Routes";

import AppContainer from "./containers/AppContainer";
import Alerts from "./utils/Alerts";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <BrowserRouter>
              <AppContainer>
                <BaseRouter />
                <Alerts />
              </AppContainer>
            </BrowserRouter>
          </AlertProvider>
        </Provider>
      </Fragment>
    );
  }
}
export default App;
