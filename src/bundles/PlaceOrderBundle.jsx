import React from 'react'
import Header from '../components/header/Header'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'

export default function PlaceOrderBundle() {
    return (
        <div className="grid-container">
            <Header />
            <main>
                <PlaceOrderScreen />
            </main>
            <footer className="row center">All right reserved</footer>
        </div>
    )
}
