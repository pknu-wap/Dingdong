import React,{useState,useCallback, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link,useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Logo from './dummy/dingdong로고.png';
import mapIcon from './dummy/지도로고.png';
import kakaoicon from'./dummy/카카오로그인.png';
import './App.css'; 

const Header = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태를 관리하기 위한 상태값
  const[showLogin,setShowLogin]=useState(false);
  const[ishover,setishover]=useState(new Array(3).fill(false));
  const [userName, setUserName] = useState(null);

  let navigate=useNavigate();
  const handleMapIconClick = () => {
    setShowModal(true); // 모달 열기
  };
 
 const[category1,setCategory1]=useState(false);
 const[category2,setCategory2]=useState(false);
 const[category3,setCategory3]=useState(false);
 useEffect(() => {
  if (category1) {
    navigate('/productlist');
  } else if (category2) {
    navigate('/productreg');
  } else if (category3) {
    navigate('/mypage');
  }
}, [category1, category2, category3,navigate]);
 const Category1Click=()=>{
  setCategory1(true);
  setCategory2(false);
  setCategory3(false);
 }
 const Category2Click=()=>{
  setCategory1(false);
  setCategory2(true);
  setCategory3(false);
 }
 const Category3Click=()=>{
  setCategory1(false);
  setCategory2(false);
  setCategory3(true);
 }
 const handleLogin = () => {
  const redirectUri = encodeURIComponent(window.location.href);
  console.log(redirectUri);
  window.location.href = `http://3.34.122.83:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;
  
};
const handleLogout = () => {
  Cookies.remove('authToken');
  Cookies.remove('userName');

  setUserName(null);

  navigate('/');
};

useEffect(() => {
  // 현재 URL에서 토큰을 가져옴
  const urlParams = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  const token = urlParams.get('token');
  console.log(token);
  if (token) {
    handleLoginSuccess(token);
  
    // URL에서 토큰 제거
  } else {
    const storedToken = Cookies.get('authToken');
    const storedUserName = Cookies.get('userName');
    if (!storedUserName && storedToken) {
      fetchUserInfo(storedToken);
    } else {
      setUserName(storedUserName);
    }
  }
}, []);

const handleLoginSuccess = (token) => {
  Cookies.set('authToken', token, { expires: 7 }); // 쿠키에 7일간 저장
  fetchUserInfo(token);
};

const fetchUserInfo = (token) => {
  fetch('http://3.34.122.83:8080/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Cookies.set('userName', data.name, { expires: 7 });
      Cookies.set('authToken', token, { expires: 7});
      setUserName(data.name);
    })
    .catch((error) =>
      console.error('사용자 정보를 가져오는 동안 에러 발생:', error)
    );
};



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
              <img src={kakaoicon} alt='로그인아이콘'onClick={handleLogin} style={{width:'auto',height:'50px',marginTop:'0px', marginLeft:'0px'}}/>
            )}
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