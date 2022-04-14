import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import SellerSlider from "../components/sellerSlider/SellerSlider";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
// import { listProducts } from '../actions/productActions';
import { userInfo } from '../actions/userActions';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import Product from '../components/Product';
import "./paginate.css";
// import Rating from '../components/Rating';


export default function SellerScreen(props) {
//   const sellerId = props.match.params.id;

   const { products, loadingProducts, errorProducts } = props;
  const {id: sellerId} = useParams();

  const { loading, error, user } = useSelector((state) => state.userInfo);

  const [pageNumber, setPageNumber] = useState(0);
  // const [length, setlength] = useState(products.length);
  const [pagelenght, setPagelenght] = useState(0);

  const productPerPage = 5;
  const pagesVisited = pageNumber * productPerPage;

  const listproduct = (product) => {

    let currentIndex = product.length 

    if (pagelenght === 0) {

      setPagelenght(currentIndex)
    }

    return product;


  }


  const pageCount = Math.ceil(pagelenght / productPerPage);

  
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

 
  // const productList = useSelector((state) => state.productList);
  // const {
  //   loading: loadingProducts,
  //   error: errorProducts,
  //   products,
  // } = productList;

  



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo(sellerId));
    // dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

  // console.log(products.length);
  return (
    <>
      <Container>
        { loading ? (<LoadingBox></LoadingBox>) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : <SellerSlider user = {user}/>}
        <Title>
          Our Product
        </Title>
        {loadingProducts ? (
            <LoadingBox></LoadingBox>
          ) : errorProducts ? (
            <MessageBox variant="danger">{errorProducts}</MessageBox>
          ) : (
            <>
              {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
              <Wrapper>
                {listproduct([...products]).slice(pagesVisited, pagesVisited + productPerPage).map((product) => (
                  <Product key={product._id} product={product}></Product>
                  
                ))}
              </Wrapper>
            </>
        )}


               <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns mt-5 pt-5"}
                previousLinkClassName={"previousBttn "}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              /> 



      </Container>

    </>
  );
}


const Container = styled.div`
  padding: 10px;
  flex:9.5;
  /* display: flex;
   align-items: center;
   justify-content: center; */
  /* align-items: flex-start; */
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
`;
const Title = styled.h2`

   font-size: 36px;
    font-weight: 600;
 text-transform: Capitalize;
    font-family: 'Josefin Sans', sans-serif;
  justify-content: center;
  align-items: center;
  display: flex

  

`;
const Wrapper = styled.div`
 justify-content: center;
  align-items: center;
  /* align-items: flex-start; */
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
`;