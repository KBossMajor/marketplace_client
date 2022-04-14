// import axios from 'axios';
import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from "styled-components";
// import { Carousel } from 'react-responsive-carousel';
import LoadingBox from '../components/loadingBox/LoadingBox';
import MessageBox from '../components/messageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import Product from '../components/Product';
import  PhoneTab from "../components/PhoneTab/PhoneTab";

// import HomestoreCategories from "../components/homestoreCategories/HomestoreCategories";
import HomestoreSlider from "../components/homestoreSlider/HomestoreSlider";
import HomestoreTrending from "../components/homestoreTrending/HomestoreTrending";
import HomestoreTopProducts from "../components/homestoreTopProducts/HomestoreTopProducts";


// import { Link } from 'react-router-dom';
// import { mobile } from "../responsive";
import "./HomeScreen.css";

// import data from '../data';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    
    const userTopSellersList = useSelector((state) => state.userTopSellersList);
    const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;


       
    useEffect(() => {
        dispatch(listProducts({}));
        dispatch(listTopSellers());
    }, [dispatch]);


    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }


    return (
        <Container>
            <div>
      
         
                {/* <h2>Top Sellers</h2> */}
                {loadingSellers ? (
                    <LoadingBox></LoadingBox>
                ) : errorSellers ? (
                    <MessageBox variant="danger">{errorSellers}</MessageBox>
                ) : (
                    <>
            
                        <HomestoreSlider/>
                        {/* <HomestoreCategories/> */}

                        {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                
                    </>
                )}
                <FeatureContainer>
                    <TrendingContainer>
                        {loading ? (
                                <LoadingBox></LoadingBox>
                            ) : error ? (
                                <MessageBox variant="danger">{error}</MessageBox>
                            ) : (
                        <>
                            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                
                            {/* {products.map((product) => ( */}
                            <HomestoreTrending   products={products} />
                            {/* ))} */}

                        </>

                        )}
                    </TrendingContainer>
                
                    <ProductContainer>
                        {loading ? (
                            <LoadingBox></LoadingBox>
                        ) : error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                            <>
                                {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                <h2 style={{ marginBottom: "0px" }}>Featured Products</h2>
                                <div className="row1 center1">

                                    {
                                    shuffle([...products]).slice(0,8).map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                    ))}
                                </div>
                            </>
                        )}
                    </ProductContainer>

                </FeatureContainer>

                <HomestoreTopProducts  products={products}   loading={loading}  error={error}  />
             
            </div>
            <PhoneTab />
        </Container>
    );
}



const Container = styled.div`
 /* display: flex; */
    width: 100%;
    background-color:#f5f5f5;
    padding-top: 20px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 20px;
`;

const FeatureContainer = styled.div`
 display: flex;
    width: 100%;
    /* background-color:#f5f5f5; */
    /* padding-top: 20px; */
    /* font-family: 'Poppins', sans-serif; */
    /* padding: 15px; */
`;

const ProductContainer = styled.div`
     flex:9;
     /* display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center; */

    width: 100%;
    /* background-color:#f5f5f5; */
    /* padding-top: 20px; */
    /* font-family: 'Poppins', sans-serif; */
    /* padding-bottom: 20px; */
`;


const TrendingContainer = styled.div`
  flex:2.5;
  margin-left:2%;
  margin-top:2%;
 /* display: flex;
 justify-content: center; */
/* align-items: center; */
    /* width: 100%; */
    /* background-color:#f5f5f5; */
    /* padding-top: 20px; */
    /* font-family: 'Poppins', sans-serif; */
    /* padding: 5px; */
`;





 