import React from 'react';
import styled from "styled-components";
import Header from '../components/header/Header';
import SearchScreen from '../screens/SearchScreen';
import Footer from '../components/footer/Footer';


export default function SearchBundle() {

    return (
        <div className="grid-container">
            <Header />
            <Container>
            
             <SearchScreen />
            
              <Footer /> 
            </Container>
           
        </div>
    )
}


const Container = styled.div`
 /* display: flex; */
    /* width: 100%; */
    background-color:#f5f5f5;
    /* padding-top: 20px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 20px; */
`;
