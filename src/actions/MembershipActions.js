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

import { fetchData, errorsAlert } from "./index";

function receivedMembershipsList(response) {
  return {
    type: RECEIVE_MEMBERSHIPS_LIST,
    payload: response
  };
}

function receivedCancelSubsricption(response) {
  return {
    type: RECEIVE_SUBSCRIPTION_CANCELED,
    payload: response
  };
}

export const fetchMembershipsList = () => {
  return dispatch => {
    dispatch(fetchData(FETCHING_MEMBERSHIPS));
    requestMembershipsList().then(
      response => {
        dispatch(receivedMembershipsList(response.data));
      },
      error => {
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
      }
    );
  };
};

export const cancelSubscription = () => {
  return dispatch => {
    dispatch(fetchData(REQUEST_CANCEL_SUBSCRIPTION));
    requestCancelSubsricption().then(
      response => {
        dispatch(receivedCancelSubsricption(response.data));
      },
      error => {
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
      }
    );
  };
};
