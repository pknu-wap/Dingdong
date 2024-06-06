import React from "react";
import { useParams } from 'react-router-dom'
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  CommentSection from './Comment';

import {useState} from "react";

const FavoriteButton = ({id,totalLike,setTotalLike}) => {                                 //찜하기 버튼 컴포넌트
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = async() => {
    try{
      const token = Cookies.get('authToken');
      console.log('Token:', token);
      if (!token) {
        throw new Error('로그인후 이용해주세요');
    }
      const headers={ 'Authorization': `Bearer ${token}`};
      const url=`http://3.34.122.83:8080/product/${id}/like`;
      const response=await axios.post(url,{},{headers});           //좋아요 요청
      const response2= await axios.get(`http://3.34.122.83:8080/product/${id}`,{headers});
      setTotalLike(response2.data.liked);    //찜하기 버튼클릭후 총좋아요개수 불러온뒤 업데이트
    setIsFavorited(!isFavorited);             //좋아요 상태표시 업데이트
    }catch(error){
      console.error(error);
      alert("좋아요 실패");
    }

  };

  return (
    <button                                       //좋아요 상태에따라 하트 색상변화
      className={`favorite-button ${isFavorited ? 'favorited' : ''}`} 
      onClick={handleFavoriteClick}                   
    >
      <i className={`fas fa-heart ${isFavorited ? 'active' : ''}`}></i>         
    </button>
  );
};

const ImageSlider = ({imageDummy}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    console.log("ImageDummy Array:", imageDummy);
    if(imageDummy.length==1){
        return(  
        <div className="slider-container">
            <img src={imageDummy[0]?.image} alt={`slide-0`} style={{width:'100%',height:'100%',maxHeight:'350px',objectFit:'contain'}} />
          </div>
          );
    }
    return (
      <div className="slider-container"> 
        <Slider {...settings}>
          {imageDummy.map((image1, index) => (
            <div key={index}>
              <img src={image1?.image} alt={`slide-${index}`} style={{width:'100%',height:'100%',maxHeight:'350px',objectFit:'contain'}}/>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

const ProductDetail=({product,setProduct})=>{                     //상품상세페이지 컴포넌트
let {id}=useParams();                           //현재페이지 url의 id찾기
let detailproduct=product.find(function(x){           //detailproduct 는 현재페이지의 상품id를 가진 객체
return x.productId==id;
});
const navigate=useNavigate();
const [totalLike,setTotalLike]=useState(detailproduct.liked);
const [regStatus,setRegStatus]=useState(detailproduct.status);
/*const delet_product=async()=>{                         //상품 삭제 함수
try{
    const token=Cookies.get('authToken');
    const url=`http://3.34.122.83:8080/product/${id}`;
    const headers={ 'Authorization': `Bearer ${token}`};
    const response=await axios.delete(url,{headers});
    console.log(response.data);

    alert('상품이 정상적으로 삭제되었습니다.');
      navigate('/'); // 예: 삭제 후 홈 페이지로 이동
/'); // 삭제 후 홈 페이지로 이동

}catch(error){
    console.error(error);
      alert('본인이 올린 상품만 삭제가 가능합니다.');
}
};*/
const statusChangeHandler= async()=>{
  try{
    const token = Cookies.get('authToken');
    console.log('Token:', token);
    if (!token) {
      throw new Error('No auth token found');
  }
    const headers={ 'Authorization': `Bearer ${token}`};
    const url=`http://3.34.122.83:8080/product/${id}/status`;
    const response=await axios.post(url,{},{headers});
    setRegStatus(response.data.status);
 
  }catch(error){
    console.error(error);
    alert("권한이 없습니다.");
  }

}
const editClickHandler=()=>{
  navigate(`/productedit/${id}`)
}
    return( 
        <>
        <Header/>
        <div className="product-detail-container">
            <div className="product-image">
               <ImageSlider imageDummy={detailproduct.images}/>
            </div>
            <div className="product-info">
                <h1>{detailproduct.title}</h1>
                <p className="product-price">{detailproduct.price}원</p>
              
                <div className="product-description">
                    <h3>상품 판매자</h3>
                    <p>{detailproduct.userName}</p>
                    <h3>상품상세설명</h3>
                    <p>{detailproduct.contents}</p>
                </div>
                <p className="product-location">거래지역: {detailproduct.locations[0]?.location},{detailproduct.locations[1]?.location}</p>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit"onClick={statusChangeHandler} style={{fontSize:'22px', width:'127.6px',height:'51.6px'}}>{regStatus==1?'판매완료':'판매중'} </button>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{fontSize:'22px'}}>  <FavoriteButton id={id} totalLike={totalLike} setTotalLike={setTotalLike}/>찜하기+<span style={{color:'gray'}}>{totalLike}</span>  </button>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"onClick={editClickHandler} style={{fontSize:'22px', width:'127.6px',height:'51.6px'}}> 상품수정 </button>
            </div>
            
        </div> 
        <CommentSection productId={id} />
        </>
    ); 
};
export default ProductDetail; 
