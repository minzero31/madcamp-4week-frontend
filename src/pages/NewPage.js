import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { useSpring, animated, useSpringValue } from '@react-spring/web'; 
import styled from 'styled-components'; 
import { useDrag } from '@use-gesture/react';
import axios from 'axios';
import '../App.css'; // 애니메이션 스타일을 불러옵니다.


// Utility function to clamp values
const clamp = (min, max, value) => Math.max(min, Math.min(max, value));

// Styled-components definitions
const DOCK_ZOOM_LIMIT = [-100, 50];
const INITIAL_WIDTH = 48;
const EXPANDED_WIDTH = INITIAL_WIDTH * 1.5;

const Body = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
    font-family: 'MaruBuri';

`;

const DockContainer = styled(animated.div)`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  height: 50px;
  padding: 10px;
  gap: 12px;
  background-color: rgba(0, 0, 0, 0.92);
  will-change: contents;
  box-sizing: content-box;
  border-radius: 12px;
  transform-origin: center bottom;
  
`;

const DockCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const DockCardStyled = styled(animated.div)`
  border-radius: 12px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-color: #262626;
  filter: saturate(0.9) brightness(0.9);
  transition: filter 200ms;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:hover {
    filter: saturate(1) brightness(1.12);
  }
`;

const CardContainer = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
\
  img {
    width: 50%;
    height: 50%;
    border-radius: 50%;
  }

  .card__blur {
    position: absolute;
    z-index: 1;
    opacity: 0.4;
    filter: blur(10px);
    transform: translateY(10px) scale(1.25);
  }

  .card__img {
    position: relative;
    z-index: 0;
  }
`;

const DividerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px;

  &:hover {
    cursor: ns-resize;
  }
`;

const DividerStyled = styled.span`
  width: 1px;
  height: 100%;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  z-index: 1000;
  
  width: 600px;
  max-height: 70%;
  overflow-y: auto;
  display: flex;
`;

const PerfumeImage = styled.img`
  width: 150px;
  height: 200px;
  margin-bottom: 20px;
`;

const AccordImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 10px;
`;

const ModalContentLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 30px;
  border-right: 1px solid #ddd;
`;

const ModalContentRight = styled.div`
  flex: 2;
  padding-left: 20px;
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`;

// Context
const DockContext = createContext(null);

// useDock hook
const useDock = () => {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
};

// useMousePosition hook
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return mousePosition;
};

// useWindowResize hook
const useWindowResize = (callback) => {
  useEffect(() => {
    const handleResize = () => callback();
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback]);
};

// Dock component
const Dock = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const isZooming = useRef(false);
  const dockRef = useRef(null);

  const setIsZooming = useCallback((value) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef.current.clientWidth);
    },
  });

  useWindowResize(() => {
    setWidth(dockRef.current.clientWidth);
  });

  const handleMouseMove = useCallback((event) => {
    setMouseX(event.clientX);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel, mouseX }}>
      <DockContainer
        ref={dockRef}
        onMouseOver={() => {
          if (!isZooming.current) {
            setHovered(true);
          }
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        style={{
          x: '-50%',
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => clamp(0.5, 2, value)),
        }}
      >
        {children}
      </DockContainer>
    </DockContext.Provider>
  );
};

// DockCard component
const DockCard = ({ children, onClick }) => {
  const cardRef = useRef(null);
  const [elCenterX, setElCenterX] = useState(0);

  const { hovered, width: dockWidth, mouseX } = useDock();

  const [{ width }, api] = useSpring(() => ({
    width: INITIAL_WIDTH,
    config: {
      mass: 0.1,
      tension: 320,
    },
  }));

  useEffect(() => {
    if (hovered && cardRef.current) {
      const { x, width } = cardRef.current.getBoundingClientRect();
      const centerX = x + width / 2;
      setElCenterX(centerX);

      const distance = Math.abs(mouseX - centerX);
      const maxDistance = dockWidth / 2;
      const scale = Math.cos((distance / maxDistance) * (Math.PI / 2));
      const newWidth = INITIAL_WIDTH + (EXPANDED_WIDTH - INITIAL_WIDTH) * scale;

      api.start({ width: newWidth });
    } else {
      api.start({ width: INITIAL_WIDTH });
    }
  }, [hovered, mouseX, dockWidth, api]);

  useWindowResize(() => {
    if (cardRef.current) {
      const { x, width } = cardRef.current.getBoundingClientRect();
      setElCenterX(x + width / 2);
    }
  });

  return (
    <DockCardContainer>
      <DockCardStyled
        ref={cardRef}
        style={{
          width,
          height: width,
        }}
        onClick={onClick}
      >
        {children}
      </DockCardStyled>
    </DockCardContainer>
  );
};

// Card component
const Card = ({ src }) => (
  <CardContainer>
    <img className="card__img" src={src} alt="" />
  </CardContainer>
);

// Divider component
const Divider = () => {
  const { setIsZooming } = useDock();

  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(({ offset: [, y] }) => {
    api.start({ y, immediate: true });
  }, {
    from: () => [0, y.get()],
    bounds: { top: DOCK_ZOOM_LIMIT[0], bottom: DOCK_ZOOM_LIMIT[1] },
    axis: 'y',
    rubberband: true,
    onDragStart: () => setIsZooming(true),
    onDragEnd: () => setIsZooming(false),
  });

  useEffect(() => {
    y.onChange(() => {
      if (y.get() < 0) {
        return;
      }
    });
  });

  return (
    <DividerContainer {...bind()}>
      <DividerStyled />
    </DividerContainer>
  );
};

// TextLabel component
const TextLabel = styled(animated.div)`
  position: absolute;
  top: 40px;
  left: 40px;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 45px;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  font-family: 'MaruBuri';
`;

// NewPage component
const GRADIENTS = [
  'https://i.pinimg.com/736x/22/fe/81/22fe81e03c301c41fda6033f6f95e8ab.jpg',
  'https://i.pinimg.com/564x/df/ee/9c/dfee9c0de7bb6ff4e3c145d29fce75c0.jpg',
  'https://i.pinimg.com/564x/08/70/fa/0870faf56017bd3a03d6d217ec5cd817.jpg',
  'https://i.pinimg.com/564x/3a/0a/11/3a0a1172f691562d7a8e38e73ffa9b56.jpg',
  'https://i.pinimg.com/564x/7c/fb/78/7cfb78e48ff8b9dc8f0921a4aceb31f2.jpg',
  'https://i.pinimg.com/564x/18/08/17/180817ec83212946b9d6a99ed482828a.jpg',
  'https://i.pinimg.com/564x/11/54/8f/11548f5a3d8043e115bd8c5a641f406f.jpg',
  'https://i.pinimg.com/564x/0c/b9/46/0cb94679a7c9df7783c6c77e2d5a43ee.jpg',
  'https://i.pinimg.com/736x/c2/02/aa/c202aa413b84b941347d2f8731ea73c9.jpg',
  'https://i.pinimg.com/564x/9e/de/4d/9ede4d844495badbae0a4d426d0f6ab3.jpg',
  'https://i.pinimg.com/564x/fe/7c/4c/fe7c4c3d1c2daf09f3640e11e7cceb4f.jpg',
  'https://i.pinimg.com/564x/79/b9/f8/79b9f817247b18b60103c7bfcfab911a.jpg',
  'https://i.pinimg.com/564x/e4/f2/4b/e4f24bd97b29b8787a83d86014d02d80.jpg',
];

const labels = [
  'Citrus', 'Fruity', 'Floriental', 'Fougere', 'Oriental', 'Woody', 
  'Green', 'Chypre', 'Spicy', 'Gourmand', 'Aquatic', 'Powdery', 'Smoky'
];

function NewPage() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMoodId, setSelectedMoodId] = useState(null);
  const [labelText, setLabelText] = useState('');
  const [isLabelVisible, setIsLabelVisible] = useState(false);

  const fetchPerfumesByMood = async (moodId) => {
    try {
      setIsLoading(true);

      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      };
      const baseurll = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.get(`${baseurll}/api/v1/perfume/perfumelist/${moodId}`, { headers });
      if (response.data.code === 'success') {
        setSelectedPerfume(response.data.data.recommendPerfumeInfoList[0]);
        setSelectedMoodId(moodId);
      } else {
        throw new Error('무드별 향수 목록 가져오기 실패');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (index) => {
    setBackgroundImage(GRADIENTS[index]);
    setLabelText(labels[index]);
    setIsLabelVisible(true); // Show label
    fetchPerfumesByMood(index + 1); // Assuming mood IDs start from 1
    setShowModal(true);
  };

  useEffect(() => {
    // Hide label after 3 seconds
    if (isLabelVisible) {
      const timer = setTimeout(() => setIsLabelVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isLabelVisible]);

  const [{ opacity, transform }, api] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(-20px)',
    config: { duration: 300 }
  }));

  useEffect(() => {
    if (isLabelVisible) {
      api.start({ opacity: 1, transform: 'translateY(0)' });
    } else {
      api.start({ opacity: 0, transform: 'translateY(-20px)' });
    }
  }, [isLabelVisible, api]);

  return (
    <Body backgroundImage={backgroundImage}>
      <Dock>
        {GRADIENTS.map((src, index) => (
          <DockCard key={src} onClick={() => handleCardClick(index)}>
            <Card src={src} />
          </DockCard>
        ))}
      </Dock>
      {showModal && selectedPerfume && (
        <Modal>
          <ModalContentLeft>
            <h2>{selectedPerfume.perfumeName}</h2>
            <p>Brand: {selectedPerfume.perfumeBrand}</p>
            <PerfumeImage src={selectedPerfume.perfumeImageUrl} alt={selectedPerfume.perfumeName} />
          </ModalContentLeft>
          <ModalContentRight>
            <h3>Main Accords:</h3>
            <ul>
              {selectedPerfume.mainAccords.slice(0, 3).map((accord) => (
                <li key={accord.id}>
                  <AccordImage src={accord.accordImageUrl} alt={accord.accordName} />
                  {accord.accordKoreanName} ({accord.accordName})
                </li>
              ))}
            </ul>
            <h3>Notes:</h3>
            <p>Top: {selectedPerfume.topNotes.slice(0, 3).join(', ')}</p>
            <p>Middle: {selectedPerfume.middleNotes.slice(0, 3).join(', ')}</p>
            <p>Base: {selectedPerfume.baseNotes.slice(0, 3).join(', ')}</p>
          </ModalContentRight>
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <TextLabel style={{
        opacity,
        transform
      }}>
        {labelText}
      </TextLabel>
    </Body>
  );
}

export default NewPage;