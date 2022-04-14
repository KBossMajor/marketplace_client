import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET, } from '../constants/productConstants';


export default function ProductListScreen() {
  const history = useHistory();
  const sellerMode = useRouteMatch().path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
	error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { user: loggedInUser } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/product/${createdProduct._id}/edit`);
    }

    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      dispatch(listProducts());
    }

   dispatch(listProducts({ seller: sellerMode ? loggedInUser._id : '' }));
  }, [
    createdProduct,
    dispatch,
    history,
    sellerMode,
    successCreate,
    successDelete,
    loggedInUser._id,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
      window.location.reload();
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container>
    <div>
        <div className="">
            <h1>Products</h1>
            <button type="butto" className="primary float-end me-2 mb-4" onClick={createHandler}>
            Create Product
            </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>SUBCATEGORY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.subcategory}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
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