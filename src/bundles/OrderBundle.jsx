import React from 'react'
import styled from "styled-components";
import Header from '../components/header/Header'
import OrderScreen from '../screens/OrderScreen'
import Footer from '../components/footer/Footer';

export default function OrderBundle() {
    return (
        <div className="grid-container">
            <Header />
            <Container>
            <main>
                <OrderScreen />
            </main>
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
