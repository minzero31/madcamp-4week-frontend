import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

export default function Offset1({ parallax }) {
  const colors = ['#F8E0E6', '#F8ECE0', '#F7F8E0', '#E0F8E0', '#E0F2F7'];
  const images = [
    'https://i.pinimg.com/736x/d0/44/eb/d044eb1d4bfb2f908df6b89c229ef994.jpg',
    'https://i.pinimg.com/736x/ee/e7/c3/eee7c3fbe1ae3efda91a3863496067ba.jpg',
    'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/52706/pexels-photo-52706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];
  const text = ["#Floriental", "#Oriental", "#Citrus", "#Woody", "#Aquatic"]

  return (
    <>
      {/* Inline style tag for custom fonts */}
      <style>
        {`
          @font-face {
            font-family: 'MaruBuri';
            src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot);
            src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot?#iefix) format("embedded-opentype"), 
                 url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2) format("woff2"), 
                 url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff) format("woff"), 
                 url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.ttf) format("truetype");
          }
        `}
      </style>

      <ParallaxLayer
        offset={1}
        speed={0}
        onClick={() => parallax.current.scrollTo(2)}
      >
        {/* 기존 텍스트 */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#123456',
          fontSize: '24px',
          textAlign: 'center',
          fontFamily: 'MaruBuri',
          zIndex: 10,
        }}>
          <p>향수를 분위기로 분류하여 알아볼 수 있어요.</p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}>
          {/* 사선으로 나눈 5개의 섹터 */}
          {[0, 1, 2, 3, 4].map((num) => (
            <div key={num} style={{
              position: 'absolute',
              top: '15%',
              left: `${num * 20}%`,
              width: '20%',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
            }}>
              <div style={{
                width: '60%',
                height: '60%',
                backgroundColor: colors[num],
                borderRadius: '0 0 50% 50% / 0 0 20% 20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              </div>
              <div style={{
                color: '#123456',
                fontSize: '24px',
                marginTop: '10px',
                fontFamily: 'MaruBuri',
              }}>
                {text[num]}
              </div>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginTop: '10px',
              }}>
                <img 
                  src={images[num]} 
                  alt={`Circle ${num + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </ParallaxLayer>
    </>
  );
}
