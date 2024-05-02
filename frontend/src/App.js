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
     <Route path="/ProductList" element={<ProductList/> } />
     <Route path="/Productreg" element={<Productreg/>}/>
     <Route path="/Mypage" element={<Mypage/> } />
     </Routes>
    </div>
  );
}

export default App;