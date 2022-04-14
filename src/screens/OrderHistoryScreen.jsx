import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';

export default function OrderHistoryScreen() {
   const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <Container>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
