import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes'



import UnicornLayoutContainer from './containers/UnicornLayoutContainer'

class App extends Component {

  render() {
    return (
      <UnicornLayoutContainer>
   
        <BrowserRouter>
           <Routes />
        </BrowserRouter>

      </UnicornLayoutContainer>
    );
  }
}

export default App;
