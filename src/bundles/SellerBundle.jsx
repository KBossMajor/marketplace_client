// import React from 'react'
import styled from "styled-components";
import Header from '../components/header/Header'
import SellerSidebar from "../components/sellSidebar/SellerSidebar";
import Left from "../components/left/Left";
import SellerScreen from '../screens/SellerScreen'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import { userInfo } from '../../actions/userActions';
import { listProducts } from '../actions/productActions';
import Footer from '../components/footer/Footer';

export default function SellerBundle() {

    const {id: sellerId} = useParams();


    const productList = useSelector((state) => state.productList);
    const {
      loading: loadingProducts,
      error: errorProducts,
      products,
    } = productList;


    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listProducts({ seller: sellerId }));
    }, [dispatch, sellerId]);

    return (
        <div className="grid-container">
            <Header />
            <Container>
            <Left />
            <SellerSidebar products={products}  errorProducts={errorProducts} loadingProducts={loadingProducts} sellerId={sellerId} />
          
            <SellerScreen products={products}  errorProducts={errorProducts} loadingProducts={loadingProducts}   />
            </Container>
            <Footer/>
        </div>
    )
}



const Container = styled.div`
 display: flex;
    width: 100%;
    background-color:#f5f5f5;
    padding-top: 20px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 20px;
`;

