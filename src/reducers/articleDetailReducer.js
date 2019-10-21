import {
  ARTICLE_DETAIL_ERROR,
  FETCH_ARTICLE_DETAIL,
  RECEIVE_ARTICLE_DETAIL
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ARTICLE_DETAIL:
      return fetchingData(state, action);
    case ARTICLE_DETAIL_ERROR:
      return hasError(state, action);
    case RECEIVE_ARTICLE_DETAIL:
      return dataReceived(state, action);
    default:
      return state;
  }
}
