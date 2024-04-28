import React from 'react';
import './App.css';
import Header from './Header';
import Nav from './Navigator';
import Product from './ProductList';


const App = () => {
    return (
        <div className="app">
            <Header />
            <Nav />
            <ProductList />
        </div>
    );
};

export default App;