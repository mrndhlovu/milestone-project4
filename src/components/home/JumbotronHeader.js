'use es6'

import React from 'react';
import styled from 'styled-components'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';


const StyledJumbotronHeader = styled(Jumbotron)
`
height: 60vh;

`;

const JumbotronHeader = props => {
    return (
        <StyledJumbotronHeader>
  <h1>UnicornAttractor!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron - style component
    for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="outline-primary">Learn more</Button>
  </p>
</StyledJumbotronHeader>
    )

}


export default JumbotronHeader;
