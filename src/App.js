import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import BaseRouter from "./Routes";

import AppContainer from "./containers/AppContainer";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <AppContainer {...this.props}>
              <BaseRouter />
            </AppContainer>
          </BrowserRouter>
        </Provider>
      </Fragment>
    );
  }
}
export default App;
