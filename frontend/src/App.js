import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./Header";
import ProductList from "./ProductList";
import Mypage from "./Mypage";
import Productreg from "./Productreg";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";

function App() {
  const [product, setProduct] = useState([]);
  // message 초기값을 ""으로 설정.
  const [message, setMessage] = useState("");

  return (
    <div className="App">
     <h1 className="App-title">{message}</h1>
     <Routes>
     <Route path="/" element={<ProductList product={product} setProduct={setProduct}/> } />
     <Route path="/productlist" element={<ProductList product={product}setProduct={setProduct} /> } />
     <Route path="/productreg" element={<Productreg/>}/>
     <Route path="/mypage" element={<Mypage/> } />
      <Route path="/productdetail/:id" element={<ProductDetail product={product}setProduct={setProduct} />}/>
      <Route path="/productEdit/:id" element={<ProductEdit product={product}setProduct={setProduct} />}/>
     
     
     </Routes>
   
    </div>
  );
}

export default App;
