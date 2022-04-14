import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CartScreen from "../screens/CartScreen";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import Left from "../components/left/Left";

export default function CartBundle() {

    return (
        <div className="grid-container">
            <Header />
            {/* <main> */}
            <Container>
            <Left />
            <Sidebar />
                <CartScreen />
            </Container>
            {/* <footer className="row center">All right reserved</footer> */}
            {/* </main> */}
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
