import S3 from "aws-s3";

import axios from "axios";

import {
  AUTH_EP,
  authQueryParams,
  COMMENTS_EP,
  MEMBERSHIP_EP,
  queryParams,
  TICKETS_EP,
  CHECKOUT_EP,
  BLOG_EP,
  getCheckoutBody
} from "../utils/urls";
import { SESSION_TOKEN } from "../constants/localStorageConstants";
import { getAwsConfig } from "../utils/appUtils";
import { APP_TYPE } from "../constants/constants";

export async function requestTicketsList() {
  return axios.get(`${TICKETS_EP}`);
}

export async function requestArticlesList() {
  return axios.get(`${BLOG_EP}`);
}

export async function requestTicketUpdate(id, body) {
  return axios.put(`${TICKETS_EP}update/${id}/`, body);
}

export async function requestArticleUpdate(id, data) {
  let body;
  let method;

  if (data.isImageUpload) {
    body = { image: data.image, isImageUpload: data.isImageUpload, id };
    method = "post";
  } else {
    body = { ...data, isImageUpload: false, id };
    method = "put";
  }

  return axios[method](`${BLOG_EP}update/${id}/`, body);
}

export async function requestTicketDelete(id) {
  return axios.delete(`${TICKETS_EP}delete/${id}/`, authQueryParams);
}

export async function requestArticleDelete(id) {
  return axios.delete(`${BLOG_EP}delete/${id}/`, authQueryParams);
}

export async function requestTicketVoteUpdate(id) {
  return axios.get(`${TICKETS_EP}api/${id}/vote/`, authQueryParams);
}

export async function requestArticleVoteUpdate(id) {
  return axios.get(`${BLOG_EP}api/${id}/vote/`, authQueryParams);
}

export async function requestMembershipsList() {
  return axios.get(`${MEMBERSHIP_EP}`);
}

export async function requestCancelSubscription(option) {
  return axios.post(
    `${MEMBERSHIP_EP}cancel-subscription/`,
    { option },
    authQueryParams
  );
}

export async function requestUser() {
  return axios.get(`${AUTH_EP}user`, authQueryParams);
}

export async function requestSignup(body) {
  return axios.post(`${AUTH_EP}signup`, body, queryParams);
}

export async function requestUpdateUserProfile(userData) {
  let requestBody;
  if (userData.isImageUpload) {
    requestBody = {
      image: userData.image,
      isImageUpload: userData.isImageUpload
    };
  } else {
    requestBody = { ...userData, isImageUpload: false };
  }

  return axios.post(`${AUTH_EP}update`, requestBody, authQueryParams);
}

export async function requestLogin(body) {
  return axios.post(`${AUTH_EP}login`, body, queryParams);
}

export async function requestLogout() {
  return axios.post(`${AUTH_EP}logout`, null, authQueryParams);
}

export async function requestCreateTicket(body) {
  return axios.post(`${TICKETS_EP}api/create/`, body, authQueryParams);
}

export async function requestCreateArticle(body) {
  return axios.post(`${BLOG_EP}api/create/`, body, authQueryParams);
}

export async function requestTicketSolution(id) {
  return axios.post(
    `${TICKETS_EP}api/paid-tickets/`,
    { ticket_id: id },
    authQueryParams
  );
}

export async function fetchTicketDetail(id) {
  return axios.get(`${TICKETS_EP}${id}/`, SESSION_TOKEN && authQueryParams);
}

export async function fetchArticleDetail(id) {
  return axios.get(
    `${BLOG_EP}article/${id}/`,
    SESSION_TOKEN && authQueryParams
  );
}

export async function requestTicketComments() {
  return axios.get(`${COMMENTS_EP}`);
}

export async function requestCreateComment(body) {
  return axios.post(`${COMMENTS_EP}create-comment/`, body, authQueryParams);
}

export async function requestCreateReply(body) {
  return axios.post(`${COMMENTS_EP}create-reply/`, body, authQueryParams);
}

// Checkout
export async function requestAddItemToCart(id, productType, otherProps) {
  return axios.post(
    `${CHECKOUT_EP}/add-to-cart/`,
    getCheckoutBody(id, productType, otherProps),
    authQueryParams
  );
}

export async function requestPendingOrder() {
  return axios.get(`${CHECKOUT_EP}/pending-order/`, authQueryParams);
}

export const requestRemoveItemFromCart = (id, productType) => {
  return axios.post(
    `${CHECKOUT_EP}/remove-item/`,
    getCheckoutBody(id, productType),
    authQueryParams
  );
};

export const requestItemPayment = () => {
  let body = { stripeToken: localStorage.getItem("stripeToken") };
  return axios.post(`${CHECKOUT_EP}/checkout/`, body, authQueryParams);
};

export async function requestTransactionUpdate() {
  return axios.post(
    `${CHECKOUT_EP}/update-transaction/`,
    { stripeToken: localStorage.getItem("stripeToken") },
    authQueryParams
  );
}

export function requestAwsFileUpload(file, fileName, app) {
  const S3Client = new S3(getAwsConfig(app));
  return S3Client.uploadFile(file, fileName);
}

export function requestAwsDeleteFile(fileName, app) {
  const S3Client = new S3(getAwsConfig(app));
  return S3Client.deleteFile(fileName);
}

export function requestRemoveImageurl(app, id) {
  const isArticleUpdate = app === APP_TYPE.post;
  const body = { id: id };
  return axios.post(
    isArticleUpdate
      ? `${BLOG_EP}remove-img-url/${id}/`
      : `${AUTH_EP}remove-img-url`,
    isArticleUpdate ? body : null,
    authQueryParams
  );
}
