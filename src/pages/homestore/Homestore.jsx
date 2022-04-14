import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, useRouteMatch, Link, } from 'react-router-dom';
import HomeScreen from '../../screens/HomeScreen';
import ProductScreen from '../../screens/ProductScreen';
import CartScreen from '../../screens/CartScreen';
import './homestore.css';
import Login from '../login/Login';
import  PhoneTab from "../../components/PhoneTab/PhoneTab";

function Homestore() {
    let {path, url} = useRouteMatch();
    // console.log(path, url);

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to={url}>
                            amazona
                        </Link>
                    </div>
                    <div>
                        <Link to="/cart">Cart
                         {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        <a href="/">MarketPlace</a>
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/signin">{ <Login />}</Route>
                    <Route path={path} component={HomeScreen} exact></Route>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>

            <PhoneTab />               
        </BrowserRouter>
    );
}

export default Homestore;