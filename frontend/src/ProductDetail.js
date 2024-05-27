import React from "react";
import { useParams } from 'react-router-dom'

import {useState} from "react";

const ProductDetail=({product,setProduct})=>{
let {id}=useParams();
let detailproduct=product.find(function(x){
return x.productId==id;
});

    return( /*
        <div className="product-detail-container">
            <div className="product-image">
                <img src={detailproduct.image} alt={detailproduct.title} />
            </div>
            <div className="product-info">
                <h1>{detailproduct.title}</h1>
                <p className="product-price">{detailproduct.price}원</p>
                <p className="product-location">거래지역: {detailproduct.location}</p>
                <div className="product-description">
                    <h3>상품 판매자</h3>
                    <p>{detailproduct.seller}</p>
                </div>
            </div>
            <div className="product-comment">
                <p>"가나다"</p>
            </div>
        </div> */
        <div>hi</div>
    ); 
};
export default ProductDetail; 
