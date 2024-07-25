import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPerfumeRecommendations } from '../services/perfumeService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom import

const PerfumeRecommendCard = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [activeText, setActiveText] = useState([]);
  const location = useLocation();
  const { selectedAccords, selecteddislikeMood, gender } = location.state || {};
  const navigate = useNavigate(); 
  const imageUrls = [
    'https://i.pinimg.com/736x/22/fe/81/22fe81e03c301c41fda6033f6f95e8ab.jpg',
    'https://i.pinimg.com/564x/df/ee/9c/dfee9c0de7bb6ff4e3c145d29fce75c0.jpg',
    'https://i.pinimg.com/564x/18/08/17/180817ec83212946b9d6a99ed482828a.jpg',
  ];

  console.log(selectedAccords);
  console.log(selecteddislikeMood);
  console.log(gender);


  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await getPerfumeRecommendations(selectedAccords, selecteddislikeMood, gender);
        setPerfumes(response.recommendPerfumeInfoList);
        setActiveText(new Array(response.data.recommendPerfumeInfoList.length * 2).fill(false));
      } catch (error) {
        console.error('Error fetching perfume recommendations:', error);
      }
    };

    fetchPerfumes();
  }, [selectedAccords, selecteddislikeMood, gender]);
  
  console.log(perfumes);
  console.log("asd");
  console.log(perfumes);


  const handleImageClick = (index) => {
    const newActiveText = [...activeText];
    newActiveText[index] = !newActiveText[index];
    setActiveText(newActiveText);
  };
  const handleNavigate = () => {
    navigate('/colorpallete'); // navigate to /colorpallete
};
  const wrapStyle = {
    position: 'relative',
    width: '350px',
    height: '450px',
    margin: '20px',
    borderRadius: '20px',
    perspective: '500px',
    cursor: 'pointer',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFF0',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    flexDirection: 'column',
};

const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
};

const cardStyle = {
    width: '100%',
    height: '100%',
    transition: 'all 1s',
    transformStyle: 'preserve-3d',
};

const cardFaceStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    backfaceVisibility: 'hidden',
    fontFamily: 'MaruBuri',
    padding: '20px',
    boxSizing: 'border-box',
};

const cardFrontStyle = {
    ...cardFaceStyle,
    backgroundColor: 'white',
    zIndex: '10',
    overflow: 'hidden',
    position: 'relative',
};

const cardBackStyle = {
    ...cardFaceStyle,
    backgroundColor: 'white',
    zIndex: '5',
    transform: 'rotateY(180deg)',
    textAlign: 'center',
    color: '#333',
    fontSize: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const mainTextStyle = {
    fontFamily: 'MaruBuri',
    fontSize: '35px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
};

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    left: '0',
    overflow: 'hidden',
    borderRadius: '20px',
};

const roundImageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    cursor: 'pointer',
};

const overlayContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '20px',
    position: 'relative',
};

const overlayImageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    position: 'relative',
};

const textOverlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    fontSize: '20px',
    opacity: '0',
    transition: 'opacity 0.3s',
    zIndex: '10',
};

    const activeOverlayStyle = {
        opacity: '1',
    };

const footerStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    color: 'black', // 텍스트 색상을 검정색으로 설정
    fontSize: '25px',
    cursor: 'pointer',
    zIndex: '20',
    padding: '10px',
    fontFamily: 'MaruBuri', // 마루부리 글씨체 적용
};
  return (
    <div style={containerStyle}>
      <div style={mainTextStyle}>당신을 위한 추천 향수</div>
      <div style={cardContainerStyle}>
        {perfumes.map((perfume, cardIndex) => (
            
          <div id="wrap" key={cardIndex} style={wrapStyle}>
            <div className="card" style={cardStyle}>
            <div className="card-front" style={cardFrontStyle}>
  <img
    src={imageUrls[cardIndex % imageUrls.length]} // Use modulo to cycle through the images
    alt={`Perfume Front ${cardIndex + 1}`}
    style={imageStyle}
  />
</div>
              <div className="card-back" style={cardBackStyle}>
                <div className="main-text">
                  <span className="main-text-large">{perfume.perfumeName}</span>
                  <div>{perfume.perfumeBrand}</div>
                  <div style={overlayContainerStyle}>
                    {perfume.mainAccords.slice(0, 2).map((accord, index) => (
                      <div
                        key={index}
                        onClick={() => handleImageClick(cardIndex * 2 + index)}
                        style={{
                          ...overlayImageStyle,
                          opacity: activeText[cardIndex * 2 + index] ? '0.5' : '1',
                        }}
                      >
                        <img
                          src={accord.accordImageUrl}
                          alt={accord.accordName}
                          style={roundImageStyle}
                        />
                        <div
                          style={{
                            ...textOverlayStyle,
                            ...(activeText[cardIndex * 2 + index] ? activeOverlayStyle : {}),
                          }}
                        >
                          {accord.accordName}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '20px', fontSize: '15px' }}>
                    <div><strong>Top Notes:</strong> {perfume.topNotes.join(', ')}</div>
                    <div><strong>Middle Notes:</strong> {perfume.middleNotes.join(', ')}</div>
                    <div><strong>Base Notes:</strong> {perfume.baseNotes.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
                #wrap:hover .card {
                    transform: rotateY(180deg);
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
                body, html {
                    margin: 0;
                    padding: 0;
                    background-color: #FFFFF0;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                }
                .main-text {
                    font-size: 20px;
                    font-weight: normal;
                    color: #333;
                }
                .main-text-large {
                    font-size: 35px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
            `}</style>    </div>
  );
};

export default PerfumeRecommendCard;