// hooks.js

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web'; 
import styled from 'styled-components'; 
import { useGesture } from '@use-gesture/react';

// Context
const DockContext = createContext(null);

// useDock 훅
export const useDock = () => {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
};

// useMousePosition 훅
export const useMousePosition = () => {
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

// useWindowResize 훅
export const useWindowResize = (callback) => {
  useEffect(() => {
    const handleResize = () => callback();
    window.addEventListener('resize', handleResize);
    handleResize(); // Call the callback initially
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback]);
};

// Dock 컴포넌트
export const Dock = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0'); // 배경색 상태 추가
  const isZooming = useRef(false);
  const dockRef = useRef(null);

  const setIsZooming = useCallback((value) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpring({
    scale: 1,
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

  // 배경색 변경 핸들러
  const handleCardClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel, mouseX, handleCardClick }}>
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
          transform: `translateX(-50%) scale(${zoomLevel.scale.to({
            range: [0.5, 1, 2],
            output: [0.5, 1, 2],
          })})`,
          backgroundColor: backgroundColor, // 배경색 적용
        }}
      >
        {children}
      </DockContainer>
    </DockContext.Provider>
  );
};

// DockCard 컴포넌트
export const DockCard = ({ children }) => {
  const cardRef = useRef(null);
  const [elCenterX, setElCenterX] = useState(0);

  const { hovered, width: dockWidth, mouseX, handleCardClick } = useDock();

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
          width: width,
          height: width,
        }}
        onClick={() => handleCardClick(cardRef.current.style.backgroundColor)}
      >
        {children}
      </DockCardStyled>
    </DockCardContainer>
  );
};

// Card 컴포넌트
export const Card = ({ src }) => {
  return (
    <CardContainer>
      <img className="card__blur" src={src} alt="" />
      <img className="card__img" src={src} alt="" />
    </CardContainer>
  );
};

// DockDivider 컴포넌트
export const DockDivider = () => {
  const { zoomLevel, setIsZooming } = useDock();

  const bind = useGesture(
    {
      onDrag: ({ down, offset: [_ox, oy], cancel, direction: [_dx, dy] }) => {
        if (oy <= DOCK_ZOOM_LIMIT[0] && dy === -1) {
          cancel();
        } else if (oy >= DOCK_ZOOM_LIMIT[1] && dy === 1) {
          cancel();
        } else {
          zoomLevel.scale.start(oy, {
            immediate: down,
          });
        }
      },
      onDragStart: () => {
        setIsZooming(true);
      },
      onDragEnd: () => {
        setIsZooming(false);
      },
    },
    {
      drag: {
        axis: 'y',
      },
    }
  );

  if (!zoomLevel) {
    return null;
  }

  return (
    <DividerContainer {...bind()}>
      <DividerStyled />
    </DividerContainer>
  );
};

// Styled-components 정의
const DOCK_ZOOM_LIMIT = [-100, 50];
const INITIAL_WIDTH = 48;
const EXPANDED_WIDTH = INITIAL_WIDTH * 1.5;

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
  width: 4px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;


// 클램프 함수
const clamp = (min, max, value) => Math.max(min, Math.min(max, value));
