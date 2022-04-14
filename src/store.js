import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { 
  userRegisterReducer,
  userSigninReducer,
  userDetailsReducer,
  userInfoReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userTopSellerListReducer,
} from './reducers/userReducers';

import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderSummaryReducer,

} from './reducers/orderReducers';

import { fetchPostsReducer, postCommentCreateReducer, } from './reducers/postReducers';
import { 
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productDeleteReducer,
  productCategoryListReducer,
  productReviewCreateReducer,
 } from './reducers/productReducers';



const initialState = {
  userSignin: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  },
    cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
       shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
  },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  fetchPosts: fetchPostsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userInfo: userInfoReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  postCommentCreate: postCommentCreateReducer,
  orderSummary: orderSummaryReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;