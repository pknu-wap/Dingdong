import React, { useState, useEffect } from "react";
import { Route, Routes,useLocation } from "react-router-dom";
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
  const location = useLocation();
  const[searchContent,setSearchContent]=useState('');
  const [page, setPage] = useState(1);
  const [searchButton,setSearchButton]=useState(0);
  const [selectedRegion, setSelectedRegion] = useState(['','']); // 선택된 지역을 관리하는 상태값
  const hideHeaderPaths = ['/productdetail'];
  const shouldHideHeader = hideHeaderPaths.some(path => location.pathname.startsWith(path));
  // message 초기값을 ""으로 설정.
  const [message, setMessage] = useState("");

  return (
    <div className="App">
     <h1 className="App-title">{message}</h1>
     {!shouldHideHeader && <Header searchContent={searchContent} setSearchContent={setSearchContent} searchButton={searchButton}setSearchButton={setSearchButton} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />}
     <Routes>
     <Route path="/" element={<ProductList product={product} setProduct={setProduct} searchContent={searchContent} setSearchContent={setSearchContent} searchButton={searchButton} setSearchButton={setSearchButton}selectedRegion={selectedRegion}/> } />
     <Route path="/productlist" element={<ProductList product={product}setProduct={setProduct} searchContent={searchContent} setSearchContent={setSearchContent} searchButton={searchButton} setSearchButton={setSearchButton}selectedRegion={selectedRegion}/> } />
     <Route path="/productreg" element={<Productreg/>}/>
     <Route path="/mypage" element={<Mypage/> } />
      <Route path="/productdetail/:id" element={<ProductDetail product={product}setProduct={setProduct} searchContent={searchContent} setSearchContent={setSearchContent} searchButton={searchButton}setSearchButton={setSearchButton} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}/>}/>
      <Route path="/productEdit/:id" element={<ProductEdit product={product}setProduct={setProduct} />}/>
     
     
     </Routes>
   
    </div>
  );
}

export default App;
