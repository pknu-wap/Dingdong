import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGridLayout from 'react-grid-layout';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Cookies from 'js-cookie';

// 제품 컴포넌트
const Product = ({ product }) => {
    const navigate = useNavigate();
    const handleProductClick = () => {
        console.log("제품상세페이지", product.productId);
        navigate(`/productdetail/${product.productId}`);
    };
    const dateStr = product.createdAt; // 주어진 UTC 시간
    const date = new Date(dateStr);
    // 한국 시간(KST)으로 변환
    const kstOffset = 9 * 60;
    const kstDate = new Date(date.getTime() + kstOffset * 60 * 1000);
    
    const year = kstDate.getFullYear();
    const month = String(kstDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(kstDate.getDate()).padStart(2, '0');
    const hours = String(kstDate.getHours()).padStart(2, '0');
    const minutes = String(kstDate.getMinutes()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;  //fromattedDate는 변환된 한국시간

    console.log(formattedDate); // 예: "2024-06-03 14:38"
    console.log(product.locations);
    

    return (
        <div className="product" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
            <img src={product.images[0]?.image} alt={product.title} />
            <div className="info">
            <h3>{product.title}</h3>
            <p>{product.price}원</p>
            <p>{product.userName}</p>
            <p>{product.locations.map(loc => loc.location).join(', ')}</p>
            <div className="info-footer">
                <p>{formattedDate}</p>
                <i className={'fas fa-heart'}></i>
                <p>{product.liked}</p>
            </div>
            {product.status == 1 ? <div className="label">판매완료</div> : null}
        </div>
               
        </div>                              //product.status가 1이면 판매완료된 상품이므로 판매완료라벨 표시
    );
};

// 그리드 레이아웃 컴포넌트
const ProductList = ({ product, setProduct,searchContent,searchButton,setSearchButton,selectedRegion }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page,setPage]=useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://3.34.122.83:8080/product/list/recent?page=${page}`);
                setProduct(response.data.productsResponse);
                setTotalPages(response.data.pageCount); // 페이지 수 설정
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('상품을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchProducts();

        const token = Cookies.get('authToken');
        console.log('Token:', token);
    }, [page,setProduct]);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                setLoading(true);
                let response;
                if(searchButton==1){
                    console.log("여기다");
                    console.log(selectedRegion[0]);
                    response=await axios.get(`http://3.34.122.83:8080/product/search/region?page=${page}&title=${searchContent}&location1=${selectedRegion[0] ? selectedRegion[0] : ''}&location2=${selectedRegion[1] ? selectedRegion[1] : ''}`) 
                }
                else{
                    response=await axios.get(`http://3.34.122.83:8080/product/search?page=${page}&title=${searchContent}`);
               }
                setProduct(response.data.productsResponse);
                setTotalPages(response.data.pageCount);
                setLoading(false);
               
            } catch (error) {
                console.error('Error searching products:', error);
                setError('검색 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };


        if (searchContent) {
            fetchFilteredProducts();
        }
        setSearchButton(0);
    }, [searchContent, page, setProduct,searchButton]); 
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // 그리드 레이아웃 설정
    const layout = product.map((product, index) => ({
        i: `${product.productId}`, // 고유한 ID로 사용
        x: index % 4, // 열 위치 계산 (한 줄에 4개씩)
        y: Math.floor(index / 4), // 행 위치 계산
        w: 1, // 너비 (1 열)
        h: 1, // 높이 (1 행)
    }));

    return (
        <>

        
        <div>
            <ReactGridLayout isDraggable={false} isResizable={false} layout={layout} cols={4} rowHeight={600} width={1400}>
                {product.map((product) => (
                    <div key={product.productId} className="product_list"style={{ display: 'flex', justifyContent: 'center', marginLeft: '30px', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                        <Product product={product} />
                    </div>
                ))}
            </ReactGridLayout>
             <div className="pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</button>
                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>다음</button>
                </div>
            </div>
        </>
    );
};

export default ProductList;
