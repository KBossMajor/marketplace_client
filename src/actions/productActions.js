import axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
} from '../constants/productConstants';

export const listProducts = ({ seller = '', name = '' , category = '', order = '',
  min = 0, max = 0, rating = 0,}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.get(`${backend_url}/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.get(`${backend_url}/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.get(`${backend_url}/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.post(
      `${backend_url}/api/products`,
      {},
      {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.put(`${backend_url}/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { user:loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = axios.delete(`${backend_url}/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
	 } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.post(
      `${backend_url}/api/products/${productId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      }
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};