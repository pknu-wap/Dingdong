import React from 'react';
import {useState} from "react"
import './App.css';
import Header from './Header';
import ProductList from'./ProductList';
import Mypage from'./Mypage';
import Productreg from'./Productreg';
import { Route, Routes,useNavigate } from "react-router-dom"; 
function App() {
  return (
    <div className="App">
     <Header/>
     <Routes>
     <Route path="/" element={<ProductList/> } />
     <Route path="/productlist" element={<ProductList/> } />
     <Route path="/productreg" element={<Productreg/>}/>
     <Route path="/mypage" element={<Mypage/> } />
     </Routes>
    </div>
  );
}

export default App;
