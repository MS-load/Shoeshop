import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import MyCart from './components/checkout/MyCart';
import HomePage from './components/HomePage';
import Checkout from './components/checkout/Checkout';
import ProductPage from './components/ProductPage';
import UserProvider, { UserContext, UserConsumer } from "./context/userContext";
import ProductProvider from "./context/productContext";
import CartProvider from "./context/cartContext";
import OrderProvider from "./context/orderContext";
import PrivateRoute from './components/PrivateRoute';
// import PublicRoute from './components/PublicRoute';

export default function App() {
  
    return (
        <div className="App">
            <ProductProvider>
                <UserProvider>
                    <CartProvider>
                    <OrderProvider>
                    <Switch>
            
                        <Route path="/MyCart" component={MyCart} />
                        <PrivateRoute path="/Checkout" component={Checkout} />
                        <Route path="/product/:id" component={ProductPage} />
                        <Route path="/:category" component={HomePage} />
                        <Route path="/" component={HomePage} />
                  
                    </Switch> 
                    </OrderProvider>
                    </CartProvider>
                </UserProvider>
            </ProductProvider>
        </div>
    );

}

