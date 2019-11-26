import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createArticle } from "../actions/BlogActions";
import CreateArticleFormField from "../components/blog/CreateArticleFormField";
import { validate } from "../utils/appUtils";
import {
  getUserProfile,
  getUser,
  getErrors,
  getArticle
} from "../selectors/appSelectors";
import { Header, Message, Container, Form } from "semantic-ui-react";
import SubmitButton from "../components/sharedComponents/SubmitButton";
import MessageModal from "../components/sharedComponents/MessageModal";
import PageHeader from "../components/sharedComponents/PageHeader";

class CreateArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

    this.handlePublish = this.handlePublish.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { article } = this.props;

    if (prevProps.article !== article) {
      article.data.id !== undefined &&
        this.props.history.push(`/article/${article.data.id}`);
    }
  }

  handlePublish(values) {
    this.props.createArticle(values);
  }

  renderField(field) {
    return <CreateArticleFormField field={field} />;
  }

  render() {
    const {
      handleSubmit,
      errorAlert,
      valid,
      pristine,
      user,
      history
    } = this.props;
    const { isLoading } = this.state;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;

    return (
      <Fragment>
        <PageHeader pageId="create-article" />
        <Container style={{ paddingTop: 20 }}>
          <Header content="Add a new article" />
          {errorAlert.status !== "" && errorAlert.status ? (
            <Message
              size="small"
              error
              header="Error creating ticket: "
              content={errorAlert.alertMsg}
            />
          ) : null}
          <Form
            className="attached fluid segment"
            onSubmit={handleSubmit(this.handlePublish)}
          >
            <Field name="title" label="Title" component={this.renderField} />
            <Field
              name="subject"
              label="Subject"
              component={this.renderField}
            />

            <Field
              name="content"
              label="Content"
              component={this.renderField}
            />

            <div style={{ paddingTop: 10 }}>
              <SubmitButton
                pristine={pristine}
                valid={valid}
                isLoading={isLoading}
                onClick={() => this.setState({ isLoading: true })}
                buttonText="Publish"
              />
            </div>
          </Form>

          {!allAccess && (
            <MessageModal
              feature="create an article"
              history={history}
              redirect="pricing"
              showMessageModal={true}
              header="UPGRADE MEMBERSHIP"
            />
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorAlert: getErrors(state),
    auth: getUser(state),
    article: getArticle(state),
    user: getUserProfile(state)
  };
};

CreateArticleContainer.propTypes = {
  errorAlert: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  createArticle: PropTypes.func.isRequired
};

export default reduxForm({ validate, form: "CreateArticleForm" })(
  connect(mapStateToProps, { createArticle })(
    withRouter(CreateArticleContainer)
  )
);
