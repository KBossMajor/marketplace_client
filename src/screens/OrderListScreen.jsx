import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen() {
  // const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const sellerMode = useRouteMatch().path.indexOf('/seller') >= 0;
  
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
     dispatch(listOrders({ seller: sellerMode ? loggedInUser._id : '' }));
  }, [dispatch, successDelete, sellerMode, loggedInUser]);
  const deleteHandler = (order) => {
     if (window.confirm('Are you sure to delete?')) {
       dispatch(deleteOrder(order._id));
     }
     
  };

  // console.log(orders)
  return (
    <Container>
    <div>
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.shippingAddress.fullName}</td>
                 <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Container>
  );
}


const Container = styled.div`
  padding: 20px;
  flex:9.5;
  /* display: flex;
   align-items: center;
   justify-content: center; */
  /* align-items: flex-start; */
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
`;