import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Routes from './components/Routes'
import Home from './components/home/Home'
import UnicornLayoutContainer from './containers/UnicornLayoutContainer'

class App extends Component {

  render() {
    return (
      <UnicornLayoutContainer>
        <BrowserRouter>
          <Switch>
           
             <Home />
          </Switch>
        </BrowserRouter>
      </UnicornLayoutContainer>
    );
  }
}

export default App;
