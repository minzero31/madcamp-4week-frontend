import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../App.css'; // 애니메이션 스타일을 불러옵니다.

const PerfumeThirdPrefer = () => {
  const [description, setDescription] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [descriptionTimeout, setDescriptionTimeout] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const location = useLocation();
  const { selectedImages: previousSelections = [] } = location.state || {};

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

  // Filter out previously selected images
  const filteredImageUrls = imageUrls.filter((_, index) => !previousSelections.includes(index));
  const filteredLabels = labels.filter((_, index) => !previousSelections.includes(index));
  const filteredDescriptions = descriptions.filter((_, index) => !previousSelections.includes(index));

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
    fontSize: '40px',
    margin: '80px 0',
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
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  };

  const nextButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f39c12',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    opacity: showNextButton ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out'
  };

  const navigate = useNavigate();

  const handleImageClick = (index) => {
    if (selectedImages.length < 3) {
      setSelectedImages(prev => [...prev, index]);
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
    }
  };

  const handleDescriptionClick = () => {
    setFadeOut(true);
    setTimeout(() => setShowDescription(false), 500);
  };

  const handleNext = () => {
    navigate('/perfumegender', { state: { selectedImages } });
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      setShowDescription(true);
      setDescriptionTimeout(setTimeout(() => {
        setDescription(filteredDescriptions[selectedImages[selectedImages.length - 1]]);
        setFadeOut(false);
      }, 100));
    }
  }, [selectedImages]);

  useEffect(() => {
    if (selectedImages.length === 3) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [selectedImages]);

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>당신이 싫어하는 향기는 무엇인가요? </div>
      <div style={imageContainerStyle}>
        {filteredImageUrls.map((url, index) => (
          <div
            key={index}
            style={imageWrapperStyle}
            onClick={() => handleImageClick(index)}
          >
            <img src={url} alt={`Perfume ${index}`} style={imageStyle(index)} />
            <div style={labelStyle}>{filteredLabels[index]}</div>
          </div>
        ))}
      </div>
      <div style={selectedImagesContainerStyle}>
        {selectedImages.map((index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {filteredLabels[index]}
          </div>
        ))}
      </div>
      <CSSTransition
        in={showDescription}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div
          style={descriptionStyle}
          onClick={handleDescriptionClick}
        >
          {description}
        </div>
      </CSSTransition>
      {showMessage && (
        <div style={messageStyle}>
          You can select up to 3 options
        </div>
      )}
      {showNextButton && (
        <button
          style={nextButtonStyle}
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PerfumeThirdPrefer;
