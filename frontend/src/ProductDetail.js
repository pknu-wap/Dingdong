import React from "react";
import { useParams } from 'react-router-dom'
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from "react";

const ProductDetail=({product,setProduct})=>{
let {id}=useParams();                           //현재페이지 url의 id찾기
let detailproduct=product.find(function(x){
return x.productId==id;
});
const navigate=useNavigate();
const delet_product=async()=>{
try{
    const token=Cookies.get('authToken');
    const url=`http://3.34.122.83:8080/product/${id}`;
    const headers={ 'Authorization': `Bearer ${token}`};
    const response=await axios.delete(url,{headers});
    console.log(response.data);
    alert('상품이 정상적으로 삭제되었습니다.');
      navigate('/'); // 예: 삭제 후 홈 페이지로 이동
}catch(error){
    console.error(error);
      alert('본인이 올린 상품만 삭제가 가능합니다.');
}
};
    return( 
        <>
        <Header/>
        <div className="product-detail-container">
            <div className="product-image">
                <img src={detailproduct.images[0]?.image} alt={detailproduct.title} />
            </div>
            <div className="product-info">
                <h1>{detailproduct.title}</h1>
                <p className="product-price">{detailproduct.price}원</p>
                <p className="product-location">거래지역: {detailproduct.locations[0]?.location}</p>
                <div className="product-description">
                    <h3>상품 판매자</h3>
                    <p>{detailproduct.userName}</p>
                    <h3>상품상세설명</h3>
                    <p>{detailproduct.contents}</p>
                </div>
            </div>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ marginLeft: '10px' }}onClick={delet_product}>삭제하기</button>
            <div className="product-comment">
                <p>"가나다"</p>
            </div>
        </div> 
        </>
    ); 
};
export default ProductDetail; 