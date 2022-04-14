import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function SellerRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedInUser && loggedInUser.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}