import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAIL,
    POST_COMMENT_CREATE_REQUEST,
    POST_COMMENT_CREATE_SUCCESS,
    POST_COMMENT_CREATE_FAIL,
    POST_COMMENT_CREATE_RESET,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL,
} from '../constants/postConstants';



export const fetchPostsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { loading: true };
    case  FETCH_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case FETCH_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case POST_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, updatedPost: action.payload };
    case POST_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const editPostReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return { loading: true };
    case EDIT_POST_SUCCESS:
      return { loading: false, success: true, updatedPost: action.payload };
    case EDIT_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

