import React from 'react'
import styled from "styled-components";
import Header from '../components/header/Header'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import Footer from '../components/footer/Footer';
import Sidebar from "../components/sidebar/Sidebar";
import Left from "../components/left/Left";

export default function OrderHistoryBundle() {
    return (
        <div className="grid-container">
            <Header />
            <Container>
            <Left />
            <Sidebar />
            {/* <main> */}
                <OrderHistoryScreen />
            {/* </main> */}
            </Container>
            <Footer/>
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
