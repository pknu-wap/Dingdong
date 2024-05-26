import React,{useState,useCallback, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes,useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Logo from './dummy/dingdong로고.png';
import mapIcon from './dummy/지도로고.png';
import './App.css'; 

const Header = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태를 관리하기 위한 상태값
  const[ishover,setishover]=useState(new Array(3).fill(false));
  const handleMapIconClick = () => {
    setShowModal(true); // 모달 열기
  };
 const[category1,setCategory1]=useState(false);
 const[category2,setCategory2]=useState(false);
 const[category3,setCategory3]=useState(false);
 const Category1Click=()=>{
  navigate('/productlist');
  setCategory1(true);
  setCategory2(false);
  setCategory3(false);
 }
 const Category2Click=()=>{
  navigate('/productreg');
  setCategory1(false);
  setCategory2(true);
  setCategory3(false);
 }
 const Category3Click=()=>{
  navigate('/mypage');
  setCategory1(false);
  setCategory2(false);
  setCategory3(true);
 }
  let navigate=useNavigate();
    return (
        <div>
            <Container fluid className='header-size'>
             <Row>
        <Col className='col-3'>
        <img src = {Logo} alt = "logo"style={{width : '40px', height: 'auto',marginBottom:'10px'}}/>
        <span style={{ fontSize: '30px' ,fontWeight:'bold',textAlign:'center'}}>딩동</span>
        </Col>

        <Col className='col-3'>
        <input class="form-control mr-sm-2" type="search" placeholder="검색어를 입력하세요" aria-label="Search"/>
        </Col>

        <Col className='col-1'>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </Col>

        <Col className='col-2'>
        <img src= {mapIcon} alt="지도 아이콘"className="icon"style={{width:'40px',height:'auto',marginBottom:'20px',marginLeft:'10px'}} onClick={handleMapIconClick}/>
        </Col>
        
        <Col className='col-3'>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">로그인/회원가입</button>
        </Col>
      </Row>
      </Container>
   
      <Navbar className="bg-body-tertiary">
      <Container>
      
        <Navbar.Brand className={category1?"category_click":""} onClick={Category1Click}onMouseOver={(e)=>{e.target.style.textDecoration="underline"}}onMouseOut={(e)=>{e.target.style.textDecoration="none"}}>전체상품목록</Navbar.Brand>
        <Navbar.Brand className={category2?"category_click":""}  onClick={Category2Click}onMouseOver={(e)=>{e.target.style.textDecoration="underline"}}onMouseOut={(e)=>{e.target.style.textDecoration="none"}}>상품판매</Navbar.Brand>
        <Navbar.Brand className={category3?"category_click":""} onClick={Category3Click}onMouseOver={(e)=>{e.target.style.textDecoration="underline"}}onMouseOut={(e)=>{e.target.style.textDecoration="none"}}>마이페이지</Navbar.Brand>
       
      </Container>
    </Navbar>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>지역 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 지역 선택 내용을 추가 */}
          <p>지역을 선택하세요.</p>
          {/* 지역 선택 UI 추가 */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            닫기
          </Button>
          {/* 선택 완료 버튼 등을 추가할 수 있음 */}
        </Modal.Footer>
      </Modal>
            
      </div>
    );
};

export default Header;