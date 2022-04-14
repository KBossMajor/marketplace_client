import React from 'react';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import Footer from '../components/footer/Footer';
import HomeScreen from '../screens/HomeScreen';

export default function HomeBundle() {

    return (
        <div className="grid-container">
            <Header />
            <Search />
            <main>
                <HomeScreen />
                <Footer/> 
            </main>
           
        </div>
    )
}
