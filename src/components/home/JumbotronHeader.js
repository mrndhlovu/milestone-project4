'use es6'

import React from 'react';
import styled from 'styled-components';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';


const StyledJumbotron = styled(Jumbotron)
`
    height: 60vh;
`;

const JumbotronHeader = () => {
    return (

        <StyledJumbotron>
  <h1>UnicornAttractor!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron - style component
    for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="outline-primary">Learn more</Button>
  </p>
</StyledJumbotron>

    )

}


export default JumbotronHeader;
