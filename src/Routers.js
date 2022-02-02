import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from 'container/main/Main';
import Product from 'container/product/Product';
import Cart from 'container/cart/Cart';

function Routers() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Main />} /> 
                    <Route path='/product' element={<Product />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </Router>  
        </>
    )
}

export default Routers
