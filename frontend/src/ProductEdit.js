import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const OPTIONS = [
  { value: 0, label: "강서구" },
  { value: 1, label: "금정구" },
  { value: 2, label: "기장군" },
  { value: 3, label: "남구" },
  { value: 4, label: "동구" },
  { value: 5, label: "동래구" },
  { value: 6, label: "부산진구" },
  { value: 7, label: "북구" },
  { value: 8, label: "사상구" },
  { value: 9, label: "사하구" },
  { value: 10, label: "서구" },
  { value: 11, label: "수영구" },
  { value: 12, label: "연제구" },
  { value: 13, label: "영도구" },
  { value: 14, label: "중구" },
  { value: 15, label: "해운대구" }
];

const  ProductEdit=({product})=>{
    let {id}=useParams();                           //현재페이지 url의 id찾기
  let detailproduct=product.find(function(x){           //detailproduct 는 현재페이지의 상품id를 가진 객체
  return x.productId==id;
  });
  console.log(detailproduct.productId);
  const [productname, set_productname] = useState(detailproduct.title);
  const [productdetail, set_productdetail] = useState(detailproduct.contents);
  const [price, set_price] = useState(detailproduct.price);
  const [uploadImgUrls, setUploadImgUrls] = useState(detailproduct.images.map((image)=>(image.image))); // 여러 이미지 URL을 저장할 상태
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일을 저장할 상태 추가
  const [response_reg, setResponse_reg] = useState(null);
  const [selectedValue, setSelectedValue] = useState(detailproduct.locations[0]?.location);
  const [selectedValue2, setSelectedValue2] = useState(detailproduct.locations[1]?.location);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = Cookies.get('authToken'); // 쿠키에서 토큰 불러오기
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/');
    }
  }, [navigate]);
  
  const putEditData = async () => {
    try {
      const token = Cookies.get('authToken');
      const url = `http://3.34.122.83:8080/product/${id}`;
      const formData = new FormData();
      const productData = {
        title: productname,
        price: parseInt(price, 10), // 가격을 숫자로 변환
        contents: productdetail,
        locations: [
          { location: selectedValue},
          { location:selectedValue2}
        ]
      };
      formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };

      const response = await axios.put(url, formData, { headers });
     console.log(response.data);
     alert('상품수정에 성공했습니다.');
     navigate('/');
    } catch (error) {
      console.error(error);
      alert('상품수정에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <div style={{ fontSize: '25px', fontWeight: 'bold', borderBottom: '1px solid #000', marginLeft: '30px', marginTop: '30px' }}>상품수정</div>
      <Container fluid style={{ marginTop: '20px', marginLeft: '20px', fontSize: '18px' }}>
        <Row>
          <Form.Label column lg={1}>
            상품이미지
          </Form.Label>
          <Col style={{height:'310px'}}>
            <ImageUpload uploadImgUrls={uploadImgUrls} setUploadImgUrls={setUploadImgUrls} setImageFiles={setImageFiles} /> {/* setImageFiles 전달 */}
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            상품명
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="상품명을 입력하세요" value={productname} onChange={(e) => { e.preventDefault(); set_productname(e.target.value); }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            상세설명
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="상품 설명을 적어주세요" value={productdetail} onChange={(e) => { e.preventDefault(); set_productdetail(e.target.value); }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            가격
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="가격을 입력하세요 (원)" value={price} onChange={(e) => { e.preventDefault(); set_price(e.target.value); }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            거래지역
          </Form.Label>
          <Col>
            <Selectregion selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            <Selectregion selectedValue={selectedValue2} setSelectedValue={setSelectedValue2} />
          </Col>
  
        </Row>
      </Container>
      <div style={{ borderTop: '1px solid #000', marginLeft: '30px', marginTop: '20px' }}></div>
      <br /><br />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ marginLeft: '1300px' }} onClick={putEditData}>수정하기</button>
    </>
  );
}

function Selectregion({ selectedValue, setSelectedValue }) {
  const handleChange = (e) => {
    setSelectedValue(e.currentTarget.value);
    console.log(selectedValue);
  };

  return (
    <select onChange={handleChange} value={selectedValue} style={{ marginTop: "5px" }}>
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.label}>{option.label}</option>
      ))}
    </select>
  );
}

const ImageUpload = ({ uploadImgUrls, setUploadImgUrls, setImageFiles }) => {
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFiles = Array.from(files);
    setImageFiles(prevFiles => [...prevFiles, ...uploadFiles]);
    const newImgUrls = uploadFiles.map(file => URL.createObjectURL(file));
    setUploadImgUrls(prevUrls => [...prevUrls, ...newImgUrls]); // URL 상태 업데이트
  };

  return (
    <>
   <div className='uploadimg'>
      {uploadImgUrls.map((url, index) => (        
        <img key={index} src={url} alt="uploaded" style={{ height:'100%',width: '100%',marginRight:'10px', objectFit:'contain'}} />
      ))}
      </div>
      <input type="file" accept="image/*" multiple onChange={onchangeImageUpload} />
    </>
  );
};

export default ProductEdit;