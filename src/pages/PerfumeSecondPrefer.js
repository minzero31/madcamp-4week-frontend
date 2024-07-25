import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom'; // react-router-dom을 사용하여 페이지 이동
import '../App.css'; // 애니메이션 스타일을 불러옵니다.

const PerfumeSecondPrefer = () => {
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [descriptionTimeout, setDescriptionTimeout] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);

  const navigate = useNavigate(); // 페이지 이동을 위한 hook

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
    'https://i.pinimg.com/736x/7a/d3/9b/7ad39b0a7d013db52e3dd112d1299100.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg',
    'https://i.pinimg.com/736x/90/d0/a3/90d0a3a94c533afd7b45144ee12f0864.jpg'
  ];

  const labels = [
    'Citrus', 'Fruity', 'Floriental', 'Fougere', 'Oriental', 'Woody', 
    'Green', 'Chypre', 'Spicy', 'Gourmand', 'Aquatic', 'Powdery', 'Smoky',
    'Spicy', 'Spicy', 'Spicy', 'Spicy', 'Spicy', 'Spicy', 'Spicy', 'Spicy', 'Spicy'
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
    '연기에서 느껴지는 독특하고 강렬한 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기',
    '계피, 향신료 등에서 느껴지는 향기'
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    fontFamily: 'MaruBuri, serif',
    backgroundColor: '#FFFFF0',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative' // To position the selected items section
  };

  const titleStyle = {
    fontSize: '35px',
    marginTop: '70px',
    marginBottom: '10px',
    fontWeight: 600,
    fontFamily: 'MaruBuriSemiBold, serif'
  };

  const imageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
    overflow: 'hidden'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  };

  const imageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '5px',
    cursor: 'pointer'
  };

  const imageStyle = (index) => ({
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    objectFit: 'cover',
    opacity: selectedImages.includes(index) ? 0.5 : 1
  });

  const labelStyle = {
    marginTop: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'MaruBuriBold, serif',
    cursor: 'pointer' // Add pointer cursor to indicate clickable labels
  };

  const descriptionStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'transparent',
    color: 'black',
    fontFamily: 'MaruBuriLight, serif',
    fontSize: '18px',
    textAlign: 'center',
    zIndex: '1000',
    padding: '0 10px'
  };

  const nextButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const selectedItemsContainerStyle = {
    position: 'absolute',
    right: '10px',
    top: '10px',
    maxWidth: '200px',
    backgroundColor: '#FFF',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  };

  const getImageGroups = () => {
    const group1 = imageUrls.slice(0, 6);
    const group2 = imageUrls.slice(6, 13);
    const group3 = imageUrls.slice(13, 21);

    return [group1, group2, group3];
  };

  const [group1, group2, group3] = getImageGroups();

  useEffect(() => {
    setShowNextButton(selectedImages.length === 5);
  }, [selectedImages]);

  const handleImageClick = (index) => {
    if (selectedImages.includes(index)) {
      // Deselect image
      setSelectedImages(selectedImages.filter(i => i !== index));
    } else if (selectedImages.length < 5) {
      // Select image
      setSelectedImages([...selectedImages, index]);
    } else {
      // Show error message if more than 5 images are selected
      setErrorMessage('선호하는 향기는 5가지만 선택 가능합니다.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleLabelClick = (index) => {
    setDescription(descriptions[index]);
    setShowDescription(true);
    if (descriptionTimeout) {
      clearTimeout(descriptionTimeout);
    }
    setDescriptionTimeout(setTimeout(() => {
      setShowDescription(false);
    }, 3000));
  };

  const handleNextButtonClick = () => {
    navigate('/perfumethirdprefer'); // navigate to the third preference page
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>당신이 선호하는 향은 무엇인가요?</h1>
      {errorMessage && (
        <div style={{ color: 'red', fontSize: '18px', fontFamily: 'MaruBuriLight, serif', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}
      <div style={imageContainerStyle}>
        {[group1, group2, group3].map((group, rowIndex) => (
          <div key={rowIndex} style={rowStyle}>
            {group.map((url, index) => {
              const absoluteIndex = rowIndex * group1.length + index;
              return (
                <div key={absoluteIndex} style={imageWrapperStyle}>
                  <img
                    src={url}
                    alt={`img-${absoluteIndex}`}
                    style={imageStyle(absoluteIndex)}
                    onClick={() => handleImageClick(absoluteIndex)}
                  />
                  <div
                    style={labelStyle}
                    onClick={() => handleLabelClick(absoluteIndex)}
                  >
                    {labels[absoluteIndex]}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <CSSTransition
        in={showDescription}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div style={descriptionStyle}>
          {description}
        </div>
      </CSSTransition>

      {showNextButton && (
        <button style={nextButtonStyle} onClick={handleNextButtonClick}>
          다음으로
        </button>
      )}

      <div style={selectedItemsContainerStyle}>
        <h3>선택된 항목:</h3>
        <ul>
          {selectedImages.map(index => (
            <li key={index}>{labels[index]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerfumeSecondPrefer;
