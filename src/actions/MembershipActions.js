import {
  RECEIVE_MEMBERSHIPS_LIST,
  FETCHING_MEMBERSHIPS,
  RECEIVE_SUBSCRIPTION_CANCELED,
  REQUEST_CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_ERROR,
  FETCH_MEMBERSHIPS_ERROR
} from "./ActionTypes";

import {
  requestMembershipsList,
  requestCancelSubscription
} from "../apis/apiRequests";

import {
  makeRequest,
  errorsAlert,
  requestSuccess,
  createMessage
} from "./index";
import { getPageId } from "../utils/urls";
import { refresh } from "../utils/appUtils";

export const fetchMembershipsList = () => {
  return dispatch => {
    dispatch(makeRequest(FETCHING_MEMBERSHIPS));
    requestMembershipsList().then(
      response => {
        dispatch(requestSuccess(RECEIVE_MEMBERSHIPS_LIST, response.data));
      },
      error => {
        dispatch(errorsAlert(FETCH_MEMBERSHIPS_ERROR, error));
      }
    );
  };
};

export const changeAccount = option => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_CANCEL_SUBSCRIPTION));
    requestCancelSubscription(option).then(
      response => {
        dispatch(requestSuccess(RECEIVE_SUBSCRIPTION_CANCELED, response.data));
        dispatch(createMessage({ successMsg: response.data.message }));
        const isPricingPage = getPageId() === "pricing";
        setTimeout(() => {
          isPricingPage && refresh();
        }, 1500);
      },
      error => {
        dispatch(errorsAlert(CANCEL_SUBSCRIPTION_ERROR, error));
      }
    );
  };
};
