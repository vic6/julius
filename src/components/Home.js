import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    return  (
      <Container>
        <Header as='h1'>Welcome to Julius
          <Header.Subheader>Create a new event to begin</Header.Subheader>
        </Header>
      </Container>
    )
  }
}
