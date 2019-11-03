import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { updateArticle, requestArticleDetail } from "../actions/BlogActions";
import EditFields from "../components/sharedComponents/EditFields";
import { getArticleDetail, getArticleUpdate } from "../selectors/appSelectors";
import EditFormWrapper from "../components/sharedComponents/EditFormWrapper";
import { refresh } from "../utils/appUtils";

class EditArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      editFields: ""
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.requestArticleDetail(id);
  }

  componentDidUpdate(prevProps) {
    const { editArticle, article } = this.props;
    const { id } = this.props.match.params;

    if (prevProps.article.data !== article.data) {
      this.setState({ editFields: article.data.data });
    }
    if (prevProps.editArticle.data !== editArticle.data) {
      if (editArticle.dataReceived) {
        this.props.history.push(`/article/${id}`);
      }
    }
  }

  handleFieldChange = (fieldName, event) => {
    const { editFields } = this.state;
    event.preventDefault();
    this.setState({
      editFields: {
        ...editFields,
        [fieldName]: event.target.value
      }
    });
  };

  handleSubmitClick() {
    this.setState({ updating: true });

    const id = parseInt(this.props.match.params.id);
    const { editFields } = this.state;
    const filteredKeys = ["title", "content", "subject"];
    let updatedValues;

    Object.keys(editFields).forEach(key => {
      if (!filteredKeys.includes(key)) {
        delete editFields[key];
        updatedValues = editFields;
      }
    });

    this.props.updateArticle(id, updatedValues);
  }

  render() {
    const { updating } = this.state;
    const {
      article,
      article: {
        data: { data }
      }
    } = this.props;

    return (
      article.dataReceived && (
        <EditFormWrapper
          headerText="Edit your article"
          handleSubmitClick={this.handleSubmitClick}
          updating={updating}
          fieldComponent={
            <EditFields
              editOption={data}
              handleFieldChange={this.handleFieldChange}
            />
          }
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    article: getArticleDetail(state),
    editArticle: getArticleUpdate(state)
  };
};

export default connect(
  mapStateToProps,
  { requestArticleDetail, updateArticle }
)(withRouter(EditArticleContainer));
