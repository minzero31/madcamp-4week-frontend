import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { getAccords } from '../services/perfumeService';

const PerfumeSecondPrefer = () => {
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAccords, setSelectedAccords] = useState([]);
  const [descriptionTimeout, setDescriptionTimeout] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [accords, setAccords] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedMoodList = location.state?.selectedImages || [];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    fontFamily: 'MaruBuri, serif',
    backgroundColor: '#FFFFF0',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative' 
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px'
  };

  const imageWrapperStyle = {
    flex: '0 1 calc(14.2857% - 10px)', 
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
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
    cursor: 'pointer'
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

  useEffect(() => {
    const fetchAccords = async () => {
      try {
        const accordsData = await getAccords(selectedMoodList);
        console.log(accordsData.data);
        setAccords(accordsData.data.accordInfoList);
      } catch (error) {
        console.error('Error fetching accords:', error);
        setErrorMessage('향 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchAccords();
  }, [selectedMoodList]);

  useEffect(() => {
    setShowNextButton(selectedImages.length === 5);
  }, [selectedImages]);

  const handleImageClick = (index, id) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter(i => i !== index));
      setSelectedAccords(selectedAccords.filter(accordId => accordId !== id));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, index]);
      setSelectedAccords([...selectedAccords, id]);
    } else {
      setErrorMessage('선호하는 향기는 5가지만 선택 가능합니다.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleLabelClick = (index) => {
    setDescription(accords[index].accordExplanation);
    setShowDescription(true);
    if (descriptionTimeout) {
      clearTimeout(descriptionTimeout);
    }
    setDescriptionTimeout(setTimeout(() => {
      setShowDescription(false);
    }, 3000));
  };

  const handleNextButtonClick = () => {
    navigate('/perfumethirdprefer', { 
      state: { 
        selectedAccords: selectedAccords,
        selectedImages: selectedImages 
      } 
    });
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
        {accords.map((accord, index) => (
          <div key={accord.id} style={imageWrapperStyle}>
            <img
              src={accord.accordImageUrl}
              alt={`img-${accord.id}`}
              style={imageStyle(index)}
              onClick={() => handleImageClick(index, accord.id)}
            />
            <div
              style={labelStyle}
              onClick={() => handleLabelClick(index)}
            >
              {accord.accordKoreanName}
            </div>
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
            <li key={accords[index].id}>{accords[index].accordKoreanName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerfumeSecondPrefer;
