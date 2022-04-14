import React from 'react';
import styled from "styled-components";
import Header from '../components/header/Header';
import ProductScreen from '../screens/ProductScreen';
import Sidebar from "../components/sidebar/Sidebar";
import Left from "../components/left/Left";
import Footer from '../components/footer/Footer';

export default function ProductBundle() {

    return (
        <div className="grid-container">
            <Header />
            <Container>
            <Left />
            <Sidebar />
            {/* <main> */}
                <ProductScreen />
            </Container>
            <Footer/>
            {/* </main> */}
            {/* <footer className="row center">All right reserved</footer> */}
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
