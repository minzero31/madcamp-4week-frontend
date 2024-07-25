import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    background-color: #FFFFF0;
  }

  .fade-out {
    animation: fadeOut 1s forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const Wrapper = styled.div`
  height: 360px;
  width: 540px;
  background-color: #3760C9;
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 0;
  top: 30px;
`;

const Lid = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-right: 270px solid transparent;
  border-bottom: 180px solid transparent;
  border-left: 270px solid transparent;
  transform-origin: top;
  transition: transform 0.25s linear;
  &.one {
    border-top: 180px solid #658ced;
    transform: rotateX(0deg);
    z-index: 3;
    transition-delay: 0.75s;
  }
  &.two {
    border-top: 180px solid #3760C9;
    transform: rotateX(90deg);
    z-index: 1;
    transition-delay: 0.5s;
  }
`;

const Envelope = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-top: 180px solid transparent;
  border-right: 270px solid #C4DFF0;
  border-bottom: 180px solid #C4DFF0;
  border-left: 270px solid #a4d4f2;
  z-index: 3;
`;

const Letter = styled.div`
  position: absolute;
  top: 20px;
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  z-index: 2;
  transition: 0.5s;
  cursor: pointer; /* 클릭 커서 추가 */
`;

const WrapperHover = styled(Wrapper)`
  &:hover ${Lid}.one {
    transform: rotateX(90deg);
    transition-delay: 0s;
  }
  &:hover ${Lid}.two {
    transform: rotateX(180deg);
    transition-delay: 0.25s;
  }
  &:hover ${Letter} {
    transform: translateY(-90px);
    transition-delay: 0.5s;
  }
`;

const PerfumeRecommend = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleLetterClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/perfumerecommendcard');
    }, 1000);
  };

  return (
    <>
      <GlobalStyle />
      <div className={fadeOut ? 'fade-out' : ''}>
        <WrapperHover>
          <Lid className="one" />
          <Lid className="two" />
          <Envelope />
          <Letter onClick={handleLetterClick} />
        </WrapperHover>
      </div>
    </>
  );
};

export default PerfumeRecommend;
