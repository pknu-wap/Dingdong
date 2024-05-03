import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom"; 
import './App.css';
import axios from 'axios';
import Header from './Header';
import ProductList from './ProductList';
import Mypage from './Mypage';
import Productreg from './Productreg';

function App() {

  // message 초기값을 ""으로 설정.
  const [message, setMessage] = useState("");

  // // useEffect(함수,배열) : 컴포넌트가 화면에 나타났을(마운트)때 자동 실행.
  // useEffect( () => {
     
  //       // fetch(url,options) : HTTP 요청 함수
  //       fetch('/demo/hello')
  //       .then(response => response.text())
  //       .then(message => {
  //       setMessage(message);
  //       });
  //       },[])

  useEffect(() => {
    // axios.get(url, config)를 사용하여 GET 요청을 보냅니다.
    axios.get('/demo/hello')
      .then(response => {
        setMessage(response.data); // 응답 데이터는 response.data에 있습니다.
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
        
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