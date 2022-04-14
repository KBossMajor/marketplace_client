import axios from "axios";

import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAIL,
    POST_COMMENT_CREATE_REQUEST,
    POST_COMMENT_CREATE_SUCCESS,
    POST_COMMENT_CREATE_FAIL,
    // EDIT_POST_REQUEST,
    // EDIT_POST_SUCCESS,
    // EDIT_POST_FAIL,
} from '../constants/postConstants';

export const fetchPosts = ({username}) => async (dispatch, getState) => {
  dispatch({ type: FETCH_POSTS_REQUEST });
  const {
    userSignin: { user },
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
   const res = username
        ? await axios.get(`${backend_url}/api/posts/profile/` + username)
        : await axios.get(`${backend_url}/api/posts/timeline/` + user._id);

        res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
        })

    dispatch({ type: FETCH_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: FETCH_POSTS_FAIL, payload: message });
  }
};


export const createComment = (postId, comment) => async (
  dispatch,
  getState
) => {
  dispatch({ type: POST_COMMENT_CREATE_REQUEST });
  const {
    userSignin: { user: loggedInUser },
    fetchPosts: { posts }
  } = getState();

  const backend_url = process.env.REACT_APP_API;

  try {
    const { data } = await axios.post(
      `${backend_url}/api/posts/${postId}/comments`,
      comment,
      {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      }
    );
    dispatch({
      type: POST_COMMENT_CREATE_SUCCESS,
      payload: data.updatedPost,
    });

    let updatedPosts = posts.map((p)=>{
       return p._id === data.updatedPost._id ? data.updatedPost : p;
    })
    
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: updatedPosts });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_COMMENT_CREATE_FAIL, payload: message });
  }
};