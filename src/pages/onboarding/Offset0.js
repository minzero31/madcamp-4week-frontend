import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';
import { animated, useSpring } from '@react-spring/web';

export default function Offset0({ parallax }) {
  const perfumeAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 },
  });
  const textAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 },
  });

  return (
    <ParallaxLayer
      offset={0}
      speed={0}
      onClick={() => parallax.current.scrollTo(1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: '24px',
        fontFamily: 'MaruBuri',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '30%',
          height: '100%',
          backgroundImage: 'url(https://i.pinimg.com/564x/45/23/c5/4523c5d4cbd6df15798f52de844f4c25.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '30%',
          top: 0,
          width: '70%',
          height: '100%',
          backgroundColor: '#E0F2F7',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', width: '80%', maxWidth: '1200px', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <animated.div
            style={{
              ...perfumeAnimation,
              marginRight: '20px',
              position: 'relative',
            }}>

            <animated.img
              src="/perfume.png"
              alt="Perfume"
              style={{
                width: '500px',
                height: 'auto',
              }}
            />
          </animated.div>
        </div>
        <animated.div style={{
          ...textAnimation,
          marginLeft: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>

<div style={{
              position: 'absolute',
              left: '-450px',
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              whiteSpace: 'nowrap',
              fontSize: '16px',
              color: 'black',
            }}>
              Madcam is very very very very very mad<br/>
              Madcam is very very very very very madMadcam is very very very very very mad<br/>
              We are so tired 
              I want to go home right now
              
            </div>
          <h1 style={{
            fontSize: '48px',
            marginBottom: '20px',
            color: 'black',
          }}>
            彩香堂:
          </h1>
          <p style={{ fontSize: '24px', marginTop: '20px' }}>
            나만의 취향을 담은 향수 추천
          </p>
        </animated.div>
      </div>
    </ParallaxLayer>
  );
}