import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Nav, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Cookies from "js-cookie";

// 제품 컴포넌트
const Product = ({ product }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    console.log("제품상세페이지");
    navigate(`/productdetail/${product.productId}`);
  };
  const dateStr = product.createdAt; // 주어진 UTC 시간
  const date = new Date(dateStr);
  // 한국 시간(KST)으로 변환
  const kstOffset = 9 * 60;
  const kstDate = new Date(date.getTime() + kstOffset * 60 * 1000);

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`; //fromattedDate는 변환된 한국시간

  console.log(formattedDate); // 예: "2024-06-03 14:38"

  return (
    <div
      className="product"
      onClick={handleProductClick}
      style={{ cursor: "pointer" }}
    >
      <img src={product.images[0]?.image} alt={product.title} />
      <div className="info">
        <h3>{product.title}</h3>
        <p>{product.price}원</p>
        <p>{product.userName}</p>
        <p>{product.locations.map((loc) => loc.location).join(", ")}</p>
        <p>{formattedDate}</p>
        {product.status == 1 ? <div className="label">판매완료</div> : null}
      </div>
    </div> //product.status가 1이면 판매완료된 상품이므로 판매완료라벨 표시
  );
};

const MyPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState("sales"); // 기본 탭은 판매목록
  const [salesList, setSalesList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    } else {
      fetchUserInfo(token);
      fetchSalesList(token);
      fetchWishList(token);
    }
  }, [navigate]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://3.34.122.83:8080/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(response.data.name);
    } catch (error) {
      console.error("사용자 정보를 가져오는 동안 에러 발생:", error);
    }
  };

  const fetchSalesList = async (token) => {
    try {
      const response = await axios.get(
        "http://3.34.122.83:8080/myPage/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalesList(response.data.productsResponse);
    } catch (error) {
      console.error("판매목록을 가져오는 동안 에러 발생:", error);
      setError("판매목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const fetchWishList = async (token) => {
    try {
      const response = await axios.get("http://3.34.122.83:8080/myPage/likes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishList(response.data.productsResponse);
    } catch (error) {
      console.error("찜목록을 가져오는 동안 에러 발생:", error);
      setError("찜목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <Container fluid style={{ marginTop: "30px" }}>
        <Row>
          <Col>
            <h1>{userName}님의 마이페이지</h1>
            <Nav variant="tabs" defaultActiveKey="/sales-list">
              <Nav.Item>
                <Nav.Link
                  eventKey="sales"
                  onClick={() => handleTabChange("sales")}
                >
                  판매목록
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="wish"
                  onClick={() => handleTabChange("wish")}
                >
                  찜목록
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {(activeTab === "sales" ? salesList : wishList).map((product) => (
                <Product key={product.productId} product={product} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyPage;
