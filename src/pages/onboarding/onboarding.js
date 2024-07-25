import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Offset0 from './Offset0';
import Offset1 from './Offset1';
import Offset2 from './Offset2';

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`;

export default function Onboarding() {
  const parallax = useRef(null);
  return (
    <div style={{ width: '100%', height: '100%', background: 'white' }}>
      <style>
        {`
          @font-face {
              font-family: 'MaruBuri';
              src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot);
              src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot?#iefix) format("embedded-opentype"), url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2) format("woff2"), url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff) format("woff"), url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.ttf) format("truetype");
          }
          /* 다른 폰트 정의들... */
        `}
      </style>
      <Parallax ref={parallax} pages={3}>

        {/* <ParallaxLayer offset={3} speed={0.8} style={{ zIndex: 2, pointerEvents: 'none' }}>
          <img src={('/peach.png')} style={{ display: 'block', width: '10%', marginLeft: '55%' }} />
          <img src={('/lily.png')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.1} speed={0.2} style={{ zIndex: 2, pointerEvents: 'none' }}>
          <img src={('/orange.png')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={-0.1} style={{ zIndex: 2, pointerEvents: 'none' }}>
          <img src={('/feesia.png')} style={{ display: 'block', width: '10%', marginLeft: '70%' }} />
          <img src={('/four_leaf_clover.png')} style={{ display: 'block', width: '10%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6, zIndex: 2, pointerEvents: 'none' }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer> */}

        {/* <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true),
          }}
        /> */}

        <Offset0 parallax={parallax} />
        <Offset1 parallax={parallax} />
        <Offset2 />
      </Parallax>
    </div>
  );
}