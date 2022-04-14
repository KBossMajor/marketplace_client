import React from 'react';
import Header from '../components/header/Header';
import ProfileScreen from '../screens/ProfileScreen';
import Footer from '../components/footer/Footer';



export default function ProfileBundle() {

    return (
        <div className="grid-container">
            <Header />
            <main>
                <ProfileScreen />
                <Footer/> 
            </main>
        </div>
    )
}
