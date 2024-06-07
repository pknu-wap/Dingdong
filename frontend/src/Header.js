import React, { useState, useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Logo from "./dummy/dingdong로고.png";
import mapIcon from "./dummy/지도로고.png";
import kakaoicon from "./dummy/카카오로그인.png";
import "./App.css";

const Header = ({searchContent,setSearchContent,searchButton,setSearchButton,selectedRegion,setSelectedRegion}) => {
  const [showModal, setShowModal] = useState(false); // 모달 상태를 관리하기 위한 상태값
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [category1, setCategory1] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);
  let navigate = useNavigate();
  const handleMapIconClick = () => {
    setShowModal(true); // 모달 열기
  };
  

  const handleRegionClick = (region) => {
    setSelectedRegion((prev) => {
      if (prev.includes(region)) {
        return prev.filter((r) => r !== region);
      } else {
        if (prev.length < 2) {
          return [...prev, region];
        } else {
          return prev;
        }
      }
    });
  };
  
  useEffect(() => {
    console.log("선택된 지역:", selectedRegion);
  }, [selectedRegion]);
  
  const fetchFilteredProducts = async (regions) => {
    try {
      const response = await axios.get("/GET/product/search/region", {
        params: {
          page: 1,
          title: "",
          location1: regions[0] || "",
          location2: regions[1] || "",
        },
      });
      console.log("필터링된 상품:", response.data);
    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    fetchFilteredProducts(selectedRegion); // 모달이 닫힐 때 현재 선택된 지역을 인자로 전달
  };

  useEffect(() => {
    if (category1) {
      navigate("/productlist");
    } else if (category2) {
      navigate("/productreg");
    } else if (category3) {
      navigate("/mypage");
    }
  }, [category1, category2, category3, navigate]);
  const Category1Click = () => {
    setCategory1(true);
    setCategory2(false);
    setCategory3(false);
  };
  const Category2Click = () => {
    setCategory1(false);
    setCategory2(true);
    setCategory3(false);
  };
  const Category3Click = () => {
    setCategory1(false);
    setCategory2(false);
    setCategory3(true);
  };
  const handleLogin = () => {
    const redirectUri = encodeURIComponent(window.location.href);
    console.log(redirectUri);
    window.location.href = `http://3.34.122.83:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
  };
  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userName");

    setUserName(null);

    navigate("/");
  };

  useEffect(() => {
    // 현재 URL에서 토큰을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const token = urlParams.get("token");
    console.log(token);
    if (token) {
      handleLoginSuccess(token);
      window.history.replaceState({}, document.title, window.location.pathname);
      // URL에서 토큰 제거
    } else {
      const storedToken = Cookies.get("authToken");
      const storedUserName = Cookies.get("userName");
      if (!storedUserName && storedToken) {
        fetchUserInfo(storedToken);
      } else {
        setUserName(storedUserName);
      }
    }
  }, []);

  const handleLoginSuccess = (token) => {
    Cookies.set("authToken", token, { expires: 7 }); // 쿠키에 7일간 저장
    fetchUserInfo(token);
  };
 
  const fetchUserInfo = (token) => {
    fetch("http://3.34.122.83:8080/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Cookies.set("userName", data.name, { expires: 7 });
        Cookies.set("authToken", token, { expires: 7 });
        setUserName(data.name);
      })
      .catch((error) =>
        console.error("사용자 정보를 가져오는 동안 에러 발생:", error)
      );
  };
 const searchButtonClickHandler=()=>{
        setSearchButton(1);
        /*try{
            const response=axios.get(`http://3.34.122.83:8080/product/search/region?page=${page}&title=${searchContent}&location1=${selectedRegion[0]}&location2=${selectedRegion[1]}}`)
        }catch(error){
          console.error(error);
        }*/
 }
  return (
    <div>
      <Container fluid className="header-size">
        <Row>
          <Col className="col-3">
            <img
              src={Logo}
              alt="logo"
              style={{ width: "40px", height: "auto", marginBottom: "10px" }}
            />
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              딩동
            </span>
          </Col>

          <Col className="col-3">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="검색어를 입력하세요"
              aria-label="Search"
              value={searchContent}
              onChange={(e) => { e.preventDefault(); setSearchContent(e.target.value); }}
            />
          </Col>

          <Col className="col-1">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={searchButtonClickHandler}>
              Search
            </button>
          </Col>

          <Col className="col-2">
            <img
              src={mapIcon}
              alt="지도 아이콘"
              className="icon"
              style={{
                width: "40px",
                height: "auto",
                marginBottom: "20px",
                marginLeft: "10px",
              }}
              onClick={handleMapIconClick}
            />
          </Col>

          <Col className="col-3">
            {userName ? (
              <>
                <span>{userName} 님</span>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <img
                src={kakaoicon}
                alt="로그인아이콘"
                onClick={handleLogin}
                style={{
                  width: "auto",
                  height: "50px",
                  marginTop: "0px",
                  marginLeft: "0px",
                }}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            className={category1 ? "category_click" : ""}
            onClick={Category1Click}
            onMouseOver={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            전체상품목록
          </Navbar.Brand>
          <Navbar.Brand
            className={category2 ? "category_click" : ""}
            onClick={Category2Click}
            onMouseOver={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            상품판매
          </Navbar.Brand>
          <Navbar.Brand
            className={category3 ? "category_click" : ""}
            onClick={Category3Click}
            onMouseOver={(e) => {
              e.target.style.textDecoration = "underline";
            }}
            onMouseOut={(e) => {
              e.target.style.textDecoration = "none";
            }}
          >
            마이페이지
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>지역 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="region-buttons">
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("강서구")}
              className={selectedRegion.includes("강서구") ? "selected" : ""}
            >
              강서구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("금정구")}
              className={selectedRegion.includes("금정구") ? "selected" : ""}
            >
              금정구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("기장군")}
              className={selectedRegion.includes("기장군") ? "selected" : ""}
            >
              기장군
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("남구")}
              className={selectedRegion.includes("남구") ? "selected" : ""}
            >
              남구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("동구")}
              className={selectedRegion.includes("동구") ? "selected" : ""}
            >
              동구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("동래구")}
              className={selectedRegion.includes("동래구") ? "selected" : ""}
            >
              동래구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("진구")}
              className={selectedRegion.includes("진구") ? "selected" : ""}
            >
              진구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("북구")}
              className={selectedRegion.includes("북구") ? "selected" : ""}
            >
              북구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("사상구")}
              className={selectedRegion.includes("사상구") ? "selected" : ""}
            >
              사상구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("사하구")}
              className={selectedRegion.includes("사하구") ? "selected" : ""}
            >
              사하구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("서구")}
              className={selectedRegion.includes("서구") ? "selected" : ""}
            >
              서구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("수영구")}
              className={selectedRegion.includes("수영구") ? "selected" : ""}
            >
              수영구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("연제구")}
              className={selectedRegion.includes("연제구") ? "selected" : ""}
            >
              연제구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("영도구")}
              className={selectedRegion.includes("영도구") ? "selected" : ""}
            >
              영도구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("중구")}
              className={selectedRegion.includes("중구") ? "selected" : ""}
            >
              중구
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => handleRegionClick("해운대구")}
              className={selectedRegion.includes("해운대구") ? "selected" : ""}
            >
              해운대구
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {selectedRegion.length > 0 && (
            <span style={{ marginLeft: "10px" }}>
              한 번 더 누르면 선택 취소됩니다.
            </span>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;
