import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 추가합니다.
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
`;

const Wrapper = styled.div`
  height: 360px; /* 300px * 1.2 */
  width: 540px; /* 450px * 1.2 */
  background-color: #3760C9;
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 0;
  top: 30px; /* y축으로 20px 내려줌 */
`;

const Lid = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-right: 270px solid transparent; /* 225px * 1.2 */
  border-bottom: 180px solid transparent; /* 150px * 1.2 */
  border-left: 270px solid transparent; /* 225px * 1.2 */
  transform-origin: top;
  transition: transform 0.25s linear;
  &.one {
    border-top: 180px solid #658ced; /* 150px * 1.2 */
    transform: rotateX(0deg);
    z-index: 3;
    transition-delay: 0.75s;
  }
  &.two {
    border-top: 180px solid #3760C9; /* 150px * 1.2 */
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
  border-top: 180px solid transparent; /* 150px * 1.2 */
  border-right: 270px solid #C4DFF0; /* 225px * 1.2 */
  border-bottom: 180px solid #C4DFF0; /* 150px * 1.2 */
  border-left: 270px solid #a4d4f2; /* 225px * 1.2 */
  z-index: 3;
`;

const Letter = styled.div`
  position: absolute;
  top: 20px; /* y축으로 20px 내려줌 */
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* 그림자 추가 */
  z-index: 2;
  transition: 0.5s;
  p {
    text-align: center;
    font-size: 30px;
    margin-top: 30px;
    color: #3B4049;
  }
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
    transform: translateY(-90px); /* 75px * 1.2 */
    transition-delay: 0.5s;
  }
`;

const PerfumeRecommend = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleLetterClick = () => {
    navigate('/perfumerecommendcard'); // 클릭 시 이동할 경로를 설정합니다.
  };

  return (
    <>
      <GlobalStyle />
      <WrapperHover>
        <Lid className="one" />
        <Lid className="two" />
        <Envelope />
        <Letter onClick={handleLetterClick}> {/* 클릭 이벤트 핸들러 추가 */}
          <p>uhahahahah</p>
        </Letter>
      </WrapperHover>
    </>
  );
};

export default PerfumeRecommend;
