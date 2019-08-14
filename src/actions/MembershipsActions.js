import { RECEIVE_MEMBERSHIPS_LIST } from "./ActionTypes";
import { requestMembershipsList } from "../apis/apiRequests";
import { fetchData, errorsAlert } from "./index";

function receivedMembershipsList(response) {
  return {
    type: RECEIVE_MEMBERSHIPS_LIST,
    payload: response
  };
}

export const fetchMembershipsList = () => {
  return dispatch => {
    dispatch(fetchData());
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
