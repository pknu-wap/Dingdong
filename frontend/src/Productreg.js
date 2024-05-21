import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import React, { useState } from "react";
import axios from 'axios';

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

function Productreg() {
  const [productname, set_productname] = useState("");
  const [productdetail, set_productdetail] = useState("");
  const [price, set_price] = useState("");
  const [selectedLocation, set_selectedLocation] = useState("");
  const [selectedImage, set_selectedImage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/product', {
        title: productname,
        price: parseFloat(price),
        contents: productdetail,
        locations: [OPTIONS[selectedLocation].label],
        images: [selectedImage]
      });
      console.log(response.data);
      // 여기서 필요한 후속 작업을 수행하세요 (예: 리디렉션 또는 알림 표시)
    } catch (error) {
      console.error('상품 등록 중 오류 발생:', error);
      // 오류 처리를 추가하세요 (예: 사용자에게 알림 표시)
    }
  };

  return (
    <>
      <div style={{ fontSize: '25px', fontWeight: 'bold', borderBottom: '1px solid #000', marginLeft: '30px', marginTop: '30px' }}>판매하기</div>
      <Container fluid style={{ marginTop: '20px', marginLeft: '20px', fontSize: '18px' }} >
        <Row>
          <Form.Label column lg={1}>
            상품이미지
          </Form.Label>
          <Col>
            <ImageUpload setSelectedImage={set_selectedImage} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            상품명
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="상품명을 입력하세요" value={productname} onChange={(e) => set_productname(e.target.value)} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            상세설명
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="상품 설명을 적어주세요" value={productdetail} onChange={(e) => set_productdetail(e.target.value)} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            가격
          </Form.Label>
          <Col>
            <Form.Control type="text" placeholder="가격을 입력하세요      (원)" value={price} onChange={(e) => set_price(e.target.value)} />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Label column lg={1}>
            거래지역
          </Form.Label>
          <Col>
            <select value={selectedLocation} onChange={(e) => set_selectedLocation(e.target.value)} style={{ marginTop: "5px" }}>
              {OPTIONS.map((option, index) => (
                <option key={index} value={index}>{option.label}</option>
              ))}
            </select>
          </Col>
        </Row>
      </Container>
      <div style={{ borderTop: '1px solid #000', marginLeft: '30px', marginTop: '20px' }}></div>
      <br /><br />
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" style={{ marginLeft: '1300px' }} onClick={handleSubmit}>판매하기</button>
    </>
  );
}

function ImageUpload({ setSelectedImage }) {
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
      setSelectedImage(reader.result); // 이미지 URL을 부모 컴포넌트로 전달
    }
  }

  return (
    <>
      <img src={uploadImgUrl} alt="Uploaded" style={{ maxHeight: '100px', maxWidth: 'auto' }} />
      <input type="file" accept="image/*" onChange={onchangeImageUpload} />
    </>
  );
}

export default Productreg;
