import React, { Component } from 'react';
import { Row, Col, Navbar, NavItem, Button} from 'react-materialize';

export default class Main extends Component {
    render() {
        return (
        <Row>
        <Col s={12}>
          <Navbar className="cyan darken-3 center">
            <h4>WePlay</h4>
            <NavItem>
            </NavItem>
          </Navbar>

            
            {!this.props.auth.isAuthenticated() &&

            <div className="center">
                <h1>
                    Please login first
                </h1>
                <Button onClick={this.props.auth.login}>Login</Button>
            </div>
            }
            <p className="App-intro center">
                Hello {this.props.name}! {" "} Looking for WePlay? <a href="/secret">click here</a>
            </p>
           
            </Col>
            </Row>
            
        )
    }
}