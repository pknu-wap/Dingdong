import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // axios 추가
import Logo from './dummy/dingdong로고.png';
import mapIcon from './dummy/지도로고.png';
import './App.css'; 

const Header = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태를 관리하기 위한 상태값
  const [selectedRegion, setSelectedRegion] = useState([]); // 선택된 지역을 관리하는 상태값
  const [category1, setCategory1] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);
  let navigate = useNavigate();

  const handleMapIconClick = () => {
    setShowModal(true); // 모달 열기
  };

  const handleRegionClick = (region) => {
    if (region === '전체 선택') {
      setSelectedRegion(['강서구', '금정구', '기장군', '남구', '동구', '동래구', '진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구']);
    } else if (region === '전체 해제') {
      setSelectedRegion([]);
    } else {
      setSelectedRegion(prev => {
        if (prev.includes(region)) {
          return prev.filter(r => r !== region);
        } else {
          return [...prev, region];
        }
      });
    }
    console.log("선택된 지역:", selectedRegion);
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get('/GET/product/search/region', {
        params: {
          page: 1,
          title: '',
          location1: selectedRegion[0] || '',
          location2: selectedRegion[1] || '',
        }
      });
      console.log("필터링된 상품:", response.data);
    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchFilteredProducts(); // 모달이 닫힐 때 API 요청을 보냅니다.
  };

  const Category1Click = () => {
    navigate('/productlist');
    setCategory1(true);
    setCategory2(false);
    setCategory3(false);
  };

  const Category2Click = () => {
    navigate('/productreg');
    setCategory1(false);
    setCategory2(true);
    setCategory3(false);
  };

  const Category3Click = () => {
    navigate('/mypage');
    setCategory1(false);
    setCategory2(false);
    setCategory3(true);
  };

  return (
    <div>
      <Container fluid className='header-size'>
        <Row>
          <Col className='col-3'>
            <img src={Logo} alt="logo" style={{ width: '40px', height: 'auto', marginBottom: '10px' }} />
            <span style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>딩동</span>
          </Col>
          <Col className='col-3'>
            <input className="form-control mr-sm-2" type="search" placeholder="검색어를 입력하세요" aria-label="Search" />
          </Col>
          <Col className='col-1'>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </Col>
          <Col className='col-2'>
            <img src={mapIcon} alt="지도 아이콘" className="icon" style={{ width: '40px', height: 'auto', marginBottom: '20px', marginLeft: '10px' }} onClick={handleMapIconClick} />
          </Col>
          <Col className='col-3'>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">로그인/회원가입</button>
          </Col>
        </Row>
      </Container>

      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className={category1 ? "category_click" : ""} onClick={Category1Click} onMouseOver={(e) => { e.target.style.textDecoration = "underline" }} onMouseOut={(e) => { e.target.style.textDecoration = "none" }}>전체상품목록</Navbar.Brand>
          <Navbar.Brand className={category2 ? "category_click" : ""} onClick={Category2Click} onMouseOver={(e) => { e.target.style.textDecoration = "underline" }} onMouseOut={(e) => { e.target.style.textDecoration = "none" }}>상품판매</Navbar.Brand>
          <Navbar.Brand className={category3 ? "category_click" : ""} onClick={Category3Click} onMouseOver={(e) => { e.target.style.textDecoration = "underline" }} onMouseOut={(e) => { e.target.style.textDecoration = "none" }}>마이페이지</Navbar.Brand>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>지역 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="region-buttons">
            <Button variant="light" size="sm" onClick={() => handleRegionClick('전체 선택')}>전체 선택</Button>
            <Button variant="light" size="sm" onClick={() => handleRegionClick('전체 해제')}>전체 해제</Button>
            <Button variant="light" size="sm" onClick={() => handleRegionClick('강서구')}>강서구</Button>
            <Button variant="light" size="sm" onClick={() => handleRegionClick('금정구')}>금정구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('기장군')}>기장군</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('남구')}>남구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('동구')}>동구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('동래구')}>동래구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('진구')}>진구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('북구')}>북구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('사상구')}>사상구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('사하구')}>사하구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('서구')}>서구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('수영구')}>수영구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('연제구')}>연제구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('영도구')}>영도구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('중구')}>중구</Button>
            <Button variant='light' size='sm' onClick={() => handleRegionClick('해운대구')}>해운대구</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Header;
