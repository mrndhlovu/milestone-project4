import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Routes from './components/Routes'

import UnicornLayoutContainer from './containers/UnicornLayoutContainer'

class App extends Component {

  render() {
    return (
      <UnicornLayoutContainer>
        <BrowserRouter>
          <Switch>
            <Routes />
          </Switch>
        </BrowserRouter>
      </UnicornLayoutContainer>
    );
  }
}

export default App;
