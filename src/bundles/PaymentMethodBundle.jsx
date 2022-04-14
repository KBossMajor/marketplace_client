import React from 'react';
import Header from '../components/header/Header';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';


export default function PaymentMethodBundle() {

    return (
        <div className="grid-container">
            <Header />
            <main>
                <PaymentMethodScreen />
            </main>
            <footer className="row center">All right reserved</footer>
        </div>
    )
}
