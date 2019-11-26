import {
  CREATE_ARTICLE,
  RECEIVE_ARTICLE,
  RECEIVE_ARTICLE_DETAIL,
  FETCH_ARTICLE_DETAIL,
  FETCH_ARTICLE_LIST,
  REQUEST_ARTICLE_UPDATE,
  RECEIVE_ARTICLE_UPDATE,
  ARTICLE_DELETED,
  REQUEST_ARTICLE_DELETE,
  ARTICLE_LIST_ERROR,
  CREATE_ARTICLE_ERROR,
  ARTICLE_DETAIL_ERROR,
  ARTICLE_UPDATE_ERROR,
  DELETE_ARTICLE_ERROR,
  RECEIVE_ARTICLE_LIST,
  REQUEST_ARTICLE_LIKE,
  UPDATED_ARTICLE_LIKES,
  ARTICLE_LIKE_ERROR,
  UPLOAD_ERROR,
  RECEIVE_UPLOAD,
  REQUEST_UPLOAD
} from "./ActionTypes";

import {
  requestArticlesList,
  requestCreateArticle,
  fetchArticleDetail,
  requestArticleUpdate,
  requestArticleDelete,
  requestArticleVoteUpdate,
  requestAwsFileUpload
} from "../apis/apiRequests";

import {
  makeRequest,
  errorsAlert,
  createMessage,
  requestSuccess,
  dataRequestFail
} from "./index";

// fetch tickets list
export const fetchArticlesList = () => {
  return dispatch => {
    dispatch(makeRequest(FETCH_ARTICLE_LIST));
    requestArticlesList().then(
      response => {
        dispatch(requestSuccess(RECEIVE_ARTICLE_LIST, response.data));
      },
      error => {
        dispatch(errorsAlert(ARTICLE_LIST_ERROR, error));
      }
    );
  };
};

export const createArticle = data => {
  return dispatch => {
    dispatch(makeRequest(CREATE_ARTICLE));
    requestCreateArticle(data).then(
      response => {
        dispatch(requestSuccess(RECEIVE_ARTICLE, response.data));
      },
      error => {
        dispatch(errorsAlert(CREATE_ARTICLE_ERROR, error));
      }
    );
  };
};

export const requestArticleDetail = id => {
  return dispatch => {
    dispatch(makeRequest(FETCH_ARTICLE_DETAIL));
    fetchArticleDetail(id).then(
      response => {
        dispatch(requestSuccess(RECEIVE_ARTICLE_DETAIL, response.data));
      },
      error => {
        dispatch(errorsAlert(ARTICLE_DETAIL_ERROR, error));
      }
    );
  };
};

export const updateArticle = (id, updates) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_ARTICLE_UPDATE));
    requestArticleUpdate(id, updates).then(
      response => {
        dispatch(createMessage({ successMsg: "Article updated" }));
        dispatch(requestSuccess(RECEIVE_ARTICLE_UPDATE, response.data));
      },
      error => {
        dispatch(errorsAlert(ARTICLE_UPDATE_ERROR, error));
      }
    );
  };
};

export const deleteArticle = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_ARTICLE_DELETE));
    requestArticleDelete(id).then(
      response => {
        dispatch(createMessage({ successMsg: "Article deleted" }));
        dispatch(requestSuccess(ARTICLE_DELETED, response.data));
      },
      error => {
        dispatch(errorsAlert(DELETE_ARTICLE_ERROR, error));
      }
    );
  };
};

export const updateArticleLikes = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_ARTICLE_LIKE));
    requestArticleVoteUpdate(id).then(
      response => {
        dispatch(requestSuccess(UPDATED_ARTICLE_LIKES, response.data));
      },
      error => {
        dispatch(errorsAlert(ARTICLE_LIKE_ERROR, error));
      }
    );
  };
};

export const uploadArticleImage = (file, fileName, app, id) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_UPLOAD));
    requestAwsFileUpload(file, fileName, app).then(
      response => {
        dispatch(requestSuccess(RECEIVE_UPLOAD, response.data));

        const userData = { image: response.location, isImageUpload: true };
        dispatch(updateArticle(id, userData));
      },
      error => {
        dispatch(createMessage({ errorMsg: error.response.data }));
        dispatch(dataRequestFail(UPLOAD_ERROR, error));
      }
    );
  };
};
