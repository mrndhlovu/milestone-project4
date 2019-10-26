import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_ERROR,
  RECEIVE_ARTICLE
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_ARTICLE:
      return fetchingData(state, action);
    case CREATE_ARTICLE_ERROR:
      return hasError(state, action);
    case RECEIVE_ARTICLE:
      return dataReceived(state, action);
    default:
      return state;
  }
}
