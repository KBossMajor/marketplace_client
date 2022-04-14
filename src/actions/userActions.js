import axios from "axios";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
} from "../constants/userConstants";


export const register = (username, email, password, isSeller, sellerName, sellerDescription) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.post(`${backend_url}/api/auth/register`, {
      username,
      email,
      password,
      isSeller,
      sellerName,
      sellerDescription
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.post(`${backend_url}/api/auth/login`, { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/signin';
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  const backend_url = process.env.REACT_APP_API;
  try {
    const {
      userSignin: { user: loggedInUser },
    } = getState();
    const { data } = await axios.get(`${backend_url}/api/users/all`, {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const userDetails = ({username}) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  const {
    userSignin: { user },
  } = getState();
  const backend_url = process.env.REACT_APP_API;
  try {
    const { data } =  await axios.get(`${backend_url}/api/users?username=${username}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const userInfo = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_INFO_REQUEST, payload: userId });
  const {
    userSignin: { user : loggedInUser },
  } = getState();
  const backend_url = process.env.REACT_APP_API;
  try {
    const { data } = await axios.get(`${backend_url}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: USER_INFO_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_INFO_FAIL, payload: message });

  }}

  export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { user: loggedInUser },
  } = getState();
  const backend_url = process.env.REACT_APP_API;
  try {
    const { data } = await axios.put(`${backend_url}/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    dispatch({ type: USER_INFO_SUCCESS, payload: data });
    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

//delete a user by an admin
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { user: loggedInUser },
  } = getState();
  const backend_url = process.env.REACT_APP_API;
  try {
    const { data } = await axios.delete(`${backend_url}/api/users/${userId}/admin`, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

//Update a user account by an Admin
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { user: loggedInUser },
  } = getState();
  const backend_url = process.env.REACT_APP_API;
  try {
    const { data } = await axios.put(`${backend_url}/api/users/admin/${user._id}`, user, {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};

export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  const backend_url = process.env.REACT_APP_API;
  try {
    const { data } = await axios.get(`${backend_url}/api/users/top-sellers`);
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};