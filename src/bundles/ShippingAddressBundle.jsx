import React from 'react'
import Header from '../components/header/Header'
import styled from "styled-components";
import ShippingAddressScreen from '../screens/ShippingAddressScreen'
import Footer from '../components/footer/Footer';

export default function ShippingAddressBundle() {
    return (
        <div className="grid-container">
            <Header />
            <Container>
            {/* <main> */}
                <ShippingAddressScreen />
                
            </Container>
            <Footer/>
            
            {/* </main> */}
            {/* <footer className="row center">All right reserved</footer> */}
        </div>
    )
}



const Container = styled.div`
 /* display: flex; */
    /* width: 100%; */
    padding-bottom:30px;
    background-color:#f5f5f5;
    /* padding-top: 20px; */
    /* font-family: 'Poppins', sans-serif;
    padding-bottom: 20px; */
`;

