'use es6'

import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Header from '../components/home/Header'

import JumbotronHeader from '../components/home/JumbotronHeader'


const UnicornLayoutContainer = props => {
    return (
        <Container>
             <Header/>
               <JumbotronHeader/>
             
             { /* Stack the columns on mobile by making one full-width and the other half-width */ }
              <Row>
                <Col xs={12} md={12}>
                    { props.children }
                </Col>
              </Row>
        </Container>
    )

}


export default UnicornLayoutContainer;
