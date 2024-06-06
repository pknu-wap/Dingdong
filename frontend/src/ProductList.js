import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGridLayout from 'react-grid-layout';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import Header from './Header';

// 제품 컴포넌트
const Product = ({ product }) => {
    const navigate = useNavigate();
    const handleProductClick = () => {
        console.log("제품상세페이지");
        navigate(`/productdetail/${product.productId}`);
    };

    return (
        <div className="product" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
            <img src={product.images[0]?.image} alt={product.title} />
            <div className="info">
                <h3>{product.title}</h3>
                <p>{product.price}원</p>
                <p>{product.locations.map(loc => loc.location).join(', ')}</p>
                <p>{product.createdAt}</p>
            </div>
        </div>
    );
};

// 그리드 레이아웃 컴포넌트
const ProductList = ({ product, setProduct }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://3.34.122.83:8080/product/list/recent?page=${page}`);
                setProduct(response.data.productsResponse);
                setTotalPages(response.data.totalPages); // assuming the API response includes totalPages
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('상품을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, setProduct]);

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
            <Header />
            <div>
                <ReactGridLayout isDraggable={false} isResizable={false} layout={layout} cols={4} rowHeight={500} width={1400}>
                    {product.map((product) => (
                        <div key={product.productId} className="product_list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
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
