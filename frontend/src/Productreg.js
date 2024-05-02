
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import React from "react";
import {useState} from "react";
import {Select }from 'react-select';

const OPTIONS = [
  {value:0, label:"강서구"},
  {value:1, label:"금정구"},
  {value:2, label:"기장군"},
  {value:3, label:"남구"},
  {value:4, label:"동구"},
  {value:5, label:"동래구"},
  {value:6, label:"부산진구"},
  {value:7,label:"북구"},
  {value:8,label:"사상구"},
  {value:9,label:"사하구"},
  {value:10,label:"서구"},
  {value:11,label:"수영구"},
  {value:12,label:"연제구"},
  {value:13,label:"영도구"},
  {value:14,label:"중구"},
  {value:15,label:"해운대구"}
]

function Productreg(){
  let [user_username, setUser_username] = useState("");
    return(
      <>
        <div style={{ fontSize: '25px' ,fontWeight:'bold', borderBottom: '1px solid #000',marginLeft:'30px',marginTop:'30px'}}>판매하기</div>
        <Container fluid style={{marginTop:'20px',marginLeft:'20px', fontSize:'18px'}} >
        <Row>
        <Form.Label column lg={1}>
          상품이미지
        </Form.Label>
        <Col>
        <ImageUpload/>
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={1}>
          상품명
        </Form.Label>
        <Col>
        <Form.Control type="text" placeholder="상품명을 입력하세요" value={user_username} onChange={(e)=>{e.preventDefault();
        setUser_username(e.target.value);}}/>
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={1}>
         상세설명
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="상품 설명을 적어주세요" />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={1}>
          가격
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="가격을 입력하세요      (원)" />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={1}>
         거래지역
        </Form.Label>
        <Col>
          <Selectregion/>
        </Col>
      </Row>

      </Container>
      <div style={{borderTop: '1px solid #000',marginLeft:'30px',marginTop:'20px'}}></div>
      <br /><br />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{marginLeft:'1300px'}}>판매하기</button>
      </>
    );
}

function Imagereg(){
    return(
       
        <Image src="holder.js/100x100" rounded />
  
    );
}

function Selectregion(){
  
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (e) => {
    setSelectedValue(e.currentTarget.value)
  }
  return(
    <select onChange={handleChange} value={selectedValue} style={{marginTop:"5px"}}>
    {OPTIONS.map((option)=>(
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
  )
}


const ImageUpload = ()=> {
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = (e)=> {
     const {files} = e.target;
     const uploadFile = files[0];
     const reader = new FileReader();
     reader.readAsDataURL(uploadFile);
     reader.onloadend = ()=> {
     setUploadImgUrl(reader.result);
  }
}
  return <>
    <img src = {uploadImgUrl} img = "img" style={{maxHeight:'100px',maxWidth:'auto'}}/>
    <input type = "file" accept = "image/*" onChange = {onchangeImageUpload}/>
    </>
}

export default Productreg;