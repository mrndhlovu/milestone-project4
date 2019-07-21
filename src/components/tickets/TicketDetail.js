import React, { Component } from "react";
import { connect } from "react-redux";

import { requestTicketsDetail } from "../../actions/index";

import {
  Container,
  Header,
  Segment,
  Dimmer,
  Loader,
  Image
} from "semantic-ui-react";

export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.requestTicketsDetail(this.props.match.params.id);
  }

  render() {
    const {
      dataReceived,
      isLoading,
      ticket: { title, created_at, description }
    } = this.props.ticket;
    return isLoading && !dataReceived ? (
      <div>
        <Dimmer active inverted>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </div>
    ) : (
      <Container>
        <Header as="h2" content={title} subheader={created_at} />
        <Header as="h4" attached="top" block>
          <Segment>
            <Header as="h2" content="Description" />
            {description}
          </Segment>
        </Header>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    ticket: state.ticketDetail,
    authUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail }
)(TicketDetail);
