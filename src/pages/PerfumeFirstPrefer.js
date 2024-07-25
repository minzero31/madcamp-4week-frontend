import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../App.css'; // 애니메이션 스타일을 불러옵니다.

const PerfumeFirstPrefer = () => {
  const [description, setDescription] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [descriptionTimeout, setDescriptionTimeout] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const imageUrls = [
    'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://images.pexels.com/photos/7385022/pexels-photo-7385022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://i.pinimg.com/736x/d0/44/eb/d044eb1d4bfb2f908df6b89c229ef994.jpg',
    'https://i.pinimg.com/564x/20/36/6b/20366bdd6bff62b192eaa09c242d657e.jpg', 
    'https://i.pinimg.com/736x/ee/e7/c3/eee7c3fbe1ae3efda91a3863496067ba.jpg', 
    'https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://images.pexels.com/photos/52706/pexels-photo-52706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://images.pexels.com/photos/14250350/pexels-photo-14250350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg', 
    'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://i.pinimg.com/564x/f0/e4/7a/f0e47ac48132e76966d90e18127f9e46.jpg', 
    'https://i.pinimg.com/736x/7a/d3/9b/7ad39b0a7d013db52e3dd112d1299100.jpg'
  ];

  const labels = [
    'Citrus', 'Fruity', 'Floriental', 'Fougere', 'Oriental', 'Woody', 
    'Green', 'Chypre', 'Spicy', 'Gourmand', 'Aquatic', 'Powdery', 'Smoky'
  ];

  const descriptions = [
    '레몬, 라임, 오렌지 같은 과일에서 느껴지는 상큼하고 밝은 향기',
    '복숭아, 사과, 딸기 과일에서 느껴지는 달콤하고 상큼한 향기',
    '자스민, 장미, 라벤더 등 다양한 꽃의 부드럽고 달콤한 향기',
    '양치식물에서 느껴지는 신선하고 자연적인 향기',
    '앰버와 바닐라의 부드러운 단맛과 몰약, 유향, 패출리의 깊이 있는 이국적인 향기',
    '침엽수, 샌달우드, 패출리와 같은 나무에서 느껴지는 따뜻하고 자연적인 향기',
    '허브, 대나무, 신선한 녹차와 같은 신선하고 자연적인 향기',
    '오크모스, 패출리, 베르가모트 등에서 느껴지는 고급스럽고 클래식한 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '캐러멜, 초콜릿, 꿀, 아몬드 등에서 느껴지는 달콤하고 맛있는 향기',
    '물, 바다, 소금에서 느껴지는 신선하고 깨끗한 향기',
    '가루 같은 부드럽고 은은한 향기',
    '연기에서 느껴지는 독특하고 강렬한 향기'
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'MaruBuri, serif',
    backgroundColor: '#FFFFF0',
    height: '100vh',
    overflow: 'hidden'
  };

  const titleStyle = {
    fontSize: '35px',
    margin: '50px 0',
    fontWeight: 600
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '5px',
    flexWrap: 'wrap',
    overflow: 'hidden'
  };

  const imageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '10px',
    cursor: 'pointer'
  };

  const imageStyle = (index) => ({
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    objectFit: 'cover',
    opacity: selectedImages.includes(index) ? 0.5 : 1
  });

  const labelStyle = {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    fontSize: '20px',
    transform: 'translateX(-50%)',
    color: 'black',
    padding: '20px',
    borderRadius: '5px',
    opacity: showDescription ? (fadeOut ? 0 : 1) : 0,
    transition: 'opacity 0.5s ease-in-out',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const selectedImagesContainerStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000
  };

  const messageStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#000',
    padding: '10px 20px',
    opacity: showMessage ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    zIndex: 1000,
    textAlign: 'center'
  };

  const nextButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    fontSize: '20px',
    color: 'black',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: showNextButton ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    zIndex: 1000,
    fontFamily: 'MaruBuri, serif'
  };

  const showDescriptionFor3Seconds = (desc) => {
    setDescription(desc);
    setShowDescription(true);
    setFadeOut(false);
    clearTimeout(descriptionTimeout);
    const timeoutId = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowDescription(false), 500); // Wait for fade out to complete
    }, 3000);
    setDescriptionTimeout(timeoutId);
  };

  const toggleImageSelection = (index) => {
    if (selectedImages.length >= 3 && !selectedImages.includes(index)) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000); // Show message for 2 seconds
      return;
    }

    setSelectedImages(prevSelectedImages =>
      prevSelectedImages.includes(index)
        ? prevSelectedImages.filter(i => i !== index)
        : [...prevSelectedImages, index]
    );
    setShowDescription(false); // Hide description when image is clicked
  };

  useEffect(() => {
    setShowNextButton(selectedImages.length === 3);
  }, [selectedImages]);

  const navigate = useNavigate();

  const handleNext = () => {


    const updatedSelectedImages = selectedImages.map(index => index + 1);

    // Navigate with the updated array
    navigate('/perfumesecondprefer', { state: { selectedImages: updatedSelectedImages } });
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          html, body {
            height: 100%;
            margin: 0;
            background-color: black;
            overflow: hidden;
          }

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
        `}
      </style>
      <h1 style={titleStyle}>당신이 좋아하는 분위기는 무엇인가요?</h1>
      <div style={imageContainerStyle}>
        {imageUrls.slice(0, 6).map((url, index) => (
          <div
            key={index}
            style={imageWrapperStyle}
            onClick={() => toggleImageSelection(index)}
          >
            <img src={url} alt={`perfume-${index}`} style={imageStyle(index)} />
            <div 
              style={labelStyle} 
              onClick={(e) => {
                e.stopPropagation(); // Prevent image click event
                showDescriptionFor3Seconds(descriptions[index]);
              }}
            >
              {labels[index]}
            </div>
          </div>
        ))}
      </div>
      <div style={imageContainerStyle}>
        {imageUrls.slice(6).map((url, index) => (
          <div
            key={index + 6}
            style={imageWrapperStyle}
            onClick={() => toggleImageSelection(index + 6)}
          >
            <img src={url} alt={`perfume-${index + 6}`} style={imageStyle(index + 6)} />
            <div 
              style={labelStyle} 
              onClick={(e) => {
                e.stopPropagation(); // Prevent image click event
                showDescriptionFor3Seconds(descriptions[index + 6]);
              }}
            >
              {labels[index + 6]}
            </div>
          </div>
        ))}
      </div>
      <CSSTransition
        in={showDescription}
        timeout={500}
        classNames="description"
        unmountOnExit
      >
        <div
          style={descriptionStyle}
          onClick={() => setShowDescription(true)}
        >
          {description}
        </div>
      </CSSTransition>
      <div style={selectedImagesContainerStyle}>
        <h2>선택된 분위기:</h2>
        {selectedImages.length === 0 ? (
          <p>없음</p>
        ) : (
          <ul>
            {selectedImages.map(index => (
              <li key={index}>{labels[index]}</li>
            ))}
          </ul>
        )}
      </div>
      <CSSTransition
        in={showMessage}
        timeout={500}
        classNames="message"
        unmountOnExit
      >
        <div style={messageStyle}>
          {showMessage ? '분위기는 3개까지 선택 가능합니다.' : ''}
        </div>
      </CSSTransition>
      {showNextButton && (
        <button style={nextButtonStyle} onClick={handleNext}>
          다음으로
        </button>
      )}
    </div>
  );
};

export default PerfumeFirstPrefer;
