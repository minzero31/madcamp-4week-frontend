import React, { useState } from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

export default function Offset2() {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true); // 애니메이션 시작
    setTimeout(() => {
      window.location.href = '/perfumefirstprefer'; // 애니메이션 후 페이지 전환
    }, 500); // 애니메이션과 같은 시간으로 설정
  };

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'black',
    fontSize: '24px',
    textAlign: 'center',
    fontFamily: 'MaruBuri',
    backgroundColor: '#E0ECF8',
    transition: 'opacity 0.5s',
    opacity: fadeOut ? 0 : 1
  };

  const textStyle = {
    transition: 'opacity 0.5s',
    opacity: fadeOut ? 0 : 1,
    cursor: 'pointer'
  };

  return (
    <ParallaxLayer
      offset={2}
      speed={0}
      style={style}
    >
      <p
        style={textStyle}
        onClick={handleClick}
      >
        지금 바로 시작해보세요
      </p>
    </ParallaxLayer>
  );
}
