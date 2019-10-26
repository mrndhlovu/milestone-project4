import {
  RECEIVE_ARTICLE_UPDATE,
  ARTICLE_UPDATE_ERROR,
  REQUEST_ARTICLE_UPDATE
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_ARTICLE_UPDATE:
      return fetchingData(state, action);
    case ARTICLE_UPDATE_ERROR:
      return hasError(state, action);
    case RECEIVE_ARTICLE_UPDATE:
      return dataReceived(state, action);
    default:
      return state;
  }
}
