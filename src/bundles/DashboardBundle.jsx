import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import DashboardScreen from '../screens/DashboardScreen';


export default function DashboardBundle() {

    return (
        <div className="grid-container">
            <Header />
            <main>
                <DashboardScreen />
            </main>
            <Footer/> 
        </div>
    )
}
