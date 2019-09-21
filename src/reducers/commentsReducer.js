import {
  RECEIVED_REPLY,
  CREATED_COMMENT,
  CREATING_COMMENT,
  CREATING_REPLY,
  REPLY_ERROR,
  CREATE_COMMENT_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATING_REPLY || CREATING_COMMENT:
      return fetchingData(state, action);
    case CREATED_COMMENT || RECEIVED_REPLY:
      return dataReceived(state, action);
    case CREATE_COMMENT_ERROR || REPLY_ERROR:
      return hasError(state, action);
    default:
      return state;
  }
}
