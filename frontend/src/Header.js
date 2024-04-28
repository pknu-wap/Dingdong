import React from 'react';

const Header = () => {
    return (
        <header>
            <div className = 'Logo'>
                <img src = "logo.png" alt="딩동" style={{width : '30px', height: ' auto'}}/>딩동
            </div>
            <div className="search-bar">
                 <input type="text" placeholder="검색어를 입력하세요" />
            </div>
            <div className="location-selector">
                <img src="map-icon.png" alt="지도 아이콘" style={{width:'20px',height:'auto'}}/>
            </div>
            <div className="user-options">
                <button>로그인 / 회원가입</button>
            </div>
        </header>
    );
};

export default Header;