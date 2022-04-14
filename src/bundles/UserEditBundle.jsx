import React from 'react'
import styled from "styled-components";
import Header from '../components/header/Header'
import UserEditScreen from '../screens/UserEditScreen'
import Footer from '../components/footer/Footer';

export default function UserEditBundle() {
    return (
       <div className="grid-container">
            <Header />
            <Container>
            {/* <main> */}
                <UserEditScreen />

             </Container>
             <Footer/>
            {/* </main> */}
            {/* <footer className="row center">All right reserved</footer> */}
        </div>
    )
}



const Container = styled.div`
 /* display: flex; */
    width: 100%;
    /* margin:20px; */
    background-color:#f5f5f5;
    padding-top: 20px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 20px;
`;
