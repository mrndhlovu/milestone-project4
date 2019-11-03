import {
  UPLOAD_ERROR,
  RECEIVE_UPLOAD,
  REQUEST_UPLOAD
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_UPLOAD:
      return fetchingData(state, action);
    case RECEIVE_UPLOAD:
      return dataReceived(state, action);
    case UPLOAD_ERROR:
      return hasError(state, action);
    default:
      return state;
  }
}
