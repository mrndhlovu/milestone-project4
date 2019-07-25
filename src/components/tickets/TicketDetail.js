import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { requestTicketsDetail } from "../../actions/index";

import {
  Container,
  Header,
  Segment,
  Dimmer,
  Loader,
  Image,
  Divider,
  Icon,
  Statistic,
  Button,
  Card,
  Comment,
  Form
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

    const date = new Date(created_at);
    const wholeDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "  / " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    return isLoading && !dataReceived ? (
      <div>
        <Dimmer active inverted>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </div>
    ) : (
      <Container style={{ paddingTop: 20 }}>
        <div style={{ paddingTop: 10 }}>
          <Button
            color="blue"
            size="tiny"
            floated="right"
            as={NavLink}
            to="/create-ticket"
          >
            Create a ticket
          </Button>
        </div>
        <Header as="h3" color="blue" subheader={`Ticket filed: ${wholeDate}`} />

        <Divider />

        <Card style={{ paddingLeft: 10 }} fluid>
          <Card.Content header={title} color="blue" />

          <Card.Content description={description} />
          <Card.Content extra>
            <Statistic.Group size="mini" color="grey">
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Votes</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>31,200</Statistic.Value>
                <Statistic.Label>Views</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Members</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Card.Content>
        </Card>
        <Segment>
          <Comment.Group>
            <Header as="h3" content="Comments" />
            <Divider />

            <Comment>
              <Icon disabled name="user" />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Icon />
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Icon disabled name="user" />
                  <Comment.Content>
                    <Comment.Author as="a">Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Elliot you are always so right :)
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Icon disabled name="user" />
              <Comment.Content>
                <Comment.Author as="a">Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  Dude, this is awesome. Thanks so much
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Form reply>
              <Form.TextArea />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Comment.Group>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticketDetail,
    authUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail }
)(TicketDetail);
