import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import store from "./store";
import BaseRouter from "./Routes";

import Container from "react-bootstrap/Container";

import Header from "./js/components/navigation/Header";
import AppContainer from "./js/containers/AppContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <AppContainer>
              <Header />
              <BaseRouter />
            </AppContainer>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
