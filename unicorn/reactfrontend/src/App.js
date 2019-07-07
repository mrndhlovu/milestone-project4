import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import store from "./store";
import BaseRouter from "./Routes";

import AppContainer from "./js/containers/AppContainer";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <AppContainer>
              <BaseRouter />
            </AppContainer>
          </BrowserRouter>
        </Provider>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
