import {
  RECEIVE_ARTICLE_LIST,
  FETCH_ARTICLE_LIST,
  ARTICLE_LIST_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ARTICLE_LIST:
      return fetchingData(state, action);
    case ARTICLE_LIST_ERROR:
      return hasError(state, action);
    case RECEIVE_ARTICLE_LIST:
      return dataReceived(state, action);
    default:
      return state;
  }
}
