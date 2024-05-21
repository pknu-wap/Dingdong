import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGridLayout from 'react-grid-layout';
import "./App.css";


import dummyMouse from './dummy/dummy_mouse.png';
import dummyShoes from './dummy/dummy_shoes.png';
import dummyPrinter from './dummy/dummy_printer.png';
import dummyPhone from './dummy/dummy_phone.png';
import dummypan from './dummy/dummy_pan.png';
import dummyCamera from './dummy/dummy_camera.png';
import dummyVaccum from './dummy/dummy_vaccum.png';
import dummyBottle from './dummy/dummy_bottle.png';
import dummyKeyboard from './dummy/dummy_keyboard.png';
import dummyHeadphone from './dummy/dummy_headphone.png';


// 더미 제품 데이터
const product =[

    {
        id : 1,
        image : dummyMouse,
        name : '마우스',
        price : 5000,
        location : '해운대구',
        seller : '이동현',
        time : '방금 전',
    },
    {
        id : 2,
        image : dummyShoes,
        name : '스니커즈',
        price : 15000,
        location : '수영구',
        seller : '이동훈',
        time : '10분 전',
    },
    {
        id : 3,
        image : dummyPrinter,
        name : '프린터',
        price : 20000,
        location : '금정구',
        seller : '송성현',
        time : '1시간 전',
    },
    {
        id : 4,
        image : dummyPhone,
        name : '사과폰',
        price : 80000,
        location : '남구',
        seller : '안시현',
        time : '2시간 전',
    },
    {
        id : 5,
        image : dummypan,
        name : '후라이팬',
        price : 8000,
        location : '사하구',
        seller : '홍길동',
        time : '4시간 전',
    },
    {
        id : 6,
        image : dummyCamera,
        name : '카메라',
        price : 30000,
        location : '영도구',
        seller : '김철수',
        time : '8시간 전',
    },
    {
        id : 7,
        image : dummyVaccum,
        name : '다0ㅣ슨 청소기',
        price : 100000,
        location : '사상구',
        seller : '김영희',
        time : '13시간 전',
    },
    {
        id : 8,
        image : dummyBottle,
        name : '텀블러',
        price : 20000,
        location : '남구',
        seller : '김민수',
        time : '1일 전',
    },
    {
        id : 9,
        image : dummyKeyboard,
        name : '키보드',
        price : 8000,
        location : '중구',
        seller : '홍길순',
        time : '3일 전',
    },
    {
        id : 10,
        image : dummyHeadphone,
        name : '헤드셋',
        price : 13000,
        location : '연재구',
        seller : '정철민',
        time : '4일 전',
    },
];

const ProductList = () => {
  /*const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 백엔드 API 엔드포인트 설정
        const response = await axios.get('https://api.example.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();

    // cleanup 함수
    return () => {
    
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;*/

  // 그리드 레이아웃 설정
  const layout = product.map((product, index) => ({
    i: `${product.id}`,
    x: index % 4,
    y: Math.floor(index / 4),
    w: 1,
    h: 1,
  }));

  return (
    <ReactGridLayout className="grid-layout" layout={layout} cols={4} rowHeight={500} width={1400}>
      {product.map((product) => (
        <div key={product.id} className="product_list"style={{ display: 'flex', justifyContent: 'center', marginLeft: '30px', alignItems: 'center', padding: '10px'}}>
          <Product product={product} />
        </div>
      ))}
    </ReactGridLayout>
  );
};

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} width='240px' height='240px' alt={product.name} />
      <div className="info">
        <h3>{product.name}</h3>
        <p>{product.price}원</p>
        <p>{product.location}</p>
        <p>{product.seller} - {product.time}</p>
      </div>
    </div>
  );
};

export default ProductList;