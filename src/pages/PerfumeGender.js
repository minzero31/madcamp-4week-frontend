import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PerfumeGender = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달받은 데이터를 가져옵니다.
  const { selectedAccords, selecteddislikeMood } = location.state || {};

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleRecommendationClick = () => {
    let genderCode;
    switch (selectedGender) {
      case 'female':
        genderCode = 'w';
        break;
      case 'male':
        genderCode = 'm';
        break;
      case 'none':
        genderCode = 'wm';
        break;
      default:
        genderCode = 'wm';
    }

    navigate('/perfumerecommend', {
      state: {
        selectedAccords,
        selecteddislikeMood,
        gender: genderCode
      }
    });
  };
// 폰트 @font-face 규칙을 style 태그로 추가
const fontStyles = `
@font-face {
  font-family: 'MaruBuri';
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot);
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot?#iefix) format("embedded-opentype"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2) format("woff2"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff) format("woff"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.ttf) format("truetype");
}

@font-face {
  font-family: 'MaruBuriSemiBold';
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.eot);
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.eot?#iefix) format("embedded-opentype"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.woff2) format("woff2"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.woff) format("woff"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.ttf) format("truetype");
}

@font-face {
  font-family: 'MaruBuriBold';
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.eot);
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.eot?#iefix) format("embedded-opentype"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.woff2) format("woff2"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.woff) format("woff"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.ttf) format("truetype");
}

@font-face {
  font-family: 'MaruBuriLight';
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.eot);
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.eot?#iefix) format("embedded-opentype"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.woff2) format("woff2"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.woff) format("woff"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.ttf) format("truetype");
}

@font-face {
  font-family: 'MaruBuriExtraLight';
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.eot);
  src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.eot?#iefix) format("embedded-opentype"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.woff2) format("woff2"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.woff) format("woff"),
       url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.ttf) format("truetype");
}
`;
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'MaruBuri, serif', // 인라인 스타일에서 폰트 패밀리 지정
    backgroundColor: '#FFFFF0',
    height: '100vh',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    marginTop: '30px',
    fontWeight: 'bold', // 'bold'로 폰트 두께 설정
    fontFamily: 'MaruBuriBold, serif', // 인라인 스타일에서 폰트 패밀리 지정
    lineHeight: '1.5' // 글자의 높이 조정
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px'
  };

  const buttonStyle = (gender) => ({
    padding: '10px 20px',
    fontSize: '18px',
    fontFamily: 'MaruBuri, serif', // 인라인 스타일에서 폰트 패밀리 지정
    backgroundColor: selectedGender === gender ? '#4CAF50' : '#f0f0f0',
    color: selectedGender === gender ? 'white' : 'black',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  });

  const recommendationButtonStyle = {
    padding: '10px 20px',
    color: 'white',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    fontFamily: 'MaruBuri, serif', // 인라인 스타일에서 폰트 패밀리 지정
    display: selectedGender ? 'block' : 'none',
    transition: 'opacity 0.3s',
    opacity: selectedGender ? 1 : 0
  };
  return (
    <div style={containerStyle}>
      <style>{fontStyles}</style>
      <h1 style={titleStyle}>향수를 추천받을 사람의 성별은 무엇인가요?</h1>
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle('female')}
          onClick={() => handleGenderSelect('female')}
        >
          Female
        </button>
        <button
          style={buttonStyle('male')}
          onClick={() => handleGenderSelect('male')}
        >
          Male
        </button>
        <button
          style={buttonStyle('none')}
          onClick={() => handleGenderSelect('none')}
        >
          선택 안 함
        </button>
      </div>
      <button
        style={recommendationButtonStyle}
        onClick={handleRecommendationClick}
      >
        나만의 추천 향수 보러가기
      </button>
    </div>
  );
};

export default PerfumeGender;