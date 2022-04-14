import axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  const backend_url = process.env.REACT_APP_API;

  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const { 
      userSignin: { user: loggedInUser },
    } = getState();
    const { data } = await axios.post(`${backend_url}/api/orders`, order, {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  const backend_url = process.env.REACT_APP_API;
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { user: loggedInUser },
  } = getState();
  try {
    const { data } = await axios.get(`${backend_url}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};


export const payOrder = (order) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order } });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = axios.put(`${backend_url}/api/orders/${order._id}/pay`, {}, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = axios.put(
      `${backend_url}/api/orders/${orderId}/deliver`, {},
      {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.get(`${backend_url}/api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const listOrders = ({ seller = '' }) => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
   const { data } = await axios.get(`${backend_url}/api/orders?seller=${seller}`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    // console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { user: loggedInUser },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = axios.delete(`${backend_url}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { user: loggedInUser},
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.get(`${backend_url}/api/orders/summary`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};