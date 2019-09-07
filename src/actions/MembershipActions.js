import {
  RECEIVE_MEMBERSHIPS_LIST,
  FETCHING_MEMBERSHIPS,
  RECEIVE_SUBSCRIPTION_CANCELED,
  REQUEST_CANCEL_SUBSCRIPTION
} from "./ActionTypes";

import {
  requestMembershipsList,
  requestCancelSubsricption
} from "../apis/apiRequests";

import { makeRequest, errorsAlert, requestSuccess } from "./index";

export const fetchMembershipsList = () => {
  return dispatch => {
    dispatch(makeRequest(FETCHING_MEMBERSHIPS));
    requestMembershipsList().then(
      response => {
        dispatch(requestSuccess(RECEIVE_MEMBERSHIPS_LIST, response.data));
      },
      error => {
        dispatch(errorsAlert(error));
      }
    );
  };
};

export const cancelSubscription = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_CANCEL_SUBSCRIPTION));
    requestCancelSubsricption().then(
      response => {
        dispatch(requestSuccess(RECEIVE_SUBSCRIPTION_CANCELED, response.data));
      },
      error => {
        dispatch(errorsAlert(error));
      }
    );
  };
};
