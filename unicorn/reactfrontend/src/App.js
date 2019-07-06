import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Header from "./js/components/navigation/Header";
import Tickets from "./js/components/Tickets";
import store from "./store";

import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <Container>
        <Provider store={store}>
          <Fragment>
            <Header />
            <Tickets />
          </Fragment>
        </Provider>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
