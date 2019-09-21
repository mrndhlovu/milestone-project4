import {
  ORDER_DETAIL_ERROR,
  REQUEST_ORDER_DETAIL,
  RECEIVE_ORDER_DETAIL
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_DETAIL_ERROR:
      return hasError(state, action);
    case REQUEST_ORDER_DETAIL:
      return fetchingData(state, action);
    case RECEIVE_ORDER_DETAIL:
      return dataReceived(state, action);
    default:
      return state;
  }
}
