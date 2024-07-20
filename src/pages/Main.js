import React, { useState, useRef, useEffect } from "react";
import perfume1 from "../assets/img/perfume1.PNG";
import perfume2 from "../assets/img/perfume2.PNG";
import perfume3 from "../assets/img/perfume3.PNG";
import perfume4 from "../assets/img/perfume4.PNG";
import perfume5 from "../assets/img/perfume5.PNG";
import perfume6 from "../assets/img/perfume6.PNG";
import perfume7 from "../assets/img/perfume7.PNG";

const Main = () => {
  const items = [
    { image: perfume1, name: "Perfume 1", brand: "Brand A" },
    { image: perfume2, name: "Perfume 2", brand: "Brand B" },
    { image: perfume3, name: "Perfume 3", brand: "Brand C" },
    { image: perfume4, name: "Perfume 4", brand: "Brand D" },
    { image: perfume5, name: "Perfume 5", brand: "Brand E" },
    { image: perfume6, name: "Perfume 6", brand: "Brand F" },
    { image: perfume7, name: "Perfume 7", brand: "Brand G" },
  ];

  const itemsToShow = 3; // Number of items to show at a time

  const [hoverIndex, setHoverIndex] = useState(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes modalImageExpand {
        from {
          transform: scale(1);
          opacity: 0;
        }
        to {
          transform: scale(1.5);
          opacity: 1;
        }
      }
      @keyframes modalContentAppear {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .modal-content {
        animation: modalContentAppear 0.5s ease-out;
      }
      .modal-image {
        animation: modalImageExpand 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrevClick = () => {
    const newIndex = Math.max(0, visibleStartIndex - itemsToShow);
    setVisibleStartIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${newIndex * (220 + 30)}px)`; // Adjust for item width + margin
    }
  };

  const handleNextClick = () => {
    const maxIndex = Math.max(0, items.length - itemsToShow);
    const newIndex = Math.min(maxIndex, visibleStartIndex + itemsToShow);
    setVisibleStartIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${newIndex * (220 + 30)}px)`; // Adjust for item width + margin
    }
  };

  const handleCardClick = (item, index) => {
    setSelectedItem({ ...item, index });
    setModalAnimation(true);
  };

  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => setSelectedItem(null), 500); // Wait for animation to finish before unmounting
  };

  const Text = ({ style, children }) => (
    <div style={style}>
      {children}
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: '',
        minHeight: '100vh',
        color: 'black',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <section
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          padding: '0 30px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: '28px',
            position: 'absolute',
            top: '20px',
            left: '30px',
            zIndex: 2,
          }}
        >
          UHAHAHAHAH
        </Text>

        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            maxWidth: `${itemsToShow * (220 + 30) - 30}px`, // Ensure space for up to 3 cards with margins
            padding: '0 15px',
            boxSizing: 'border-box',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              boxSizing: 'border-box',
              width: `calc(${items.length * (220 + 30)}px)`, // Total width of carousel items
              transform: `translateX(-${visibleStartIndex * (220 + 30)}px)`, // Adjust for item width + margin
            }}
            ref={carouselRef}
          >
            {items.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => handleCardClick(item, index)}
                style={{
                  width: '220px',
                  height: '300px',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  marginRight: '30px',
                  cursor: 'pointer',
                  transition: 'transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease',
                  transform: hoverIndex === index ? 'scale(1.1)' : 'scale(1)',
                  opacity: hoverIndex === index ? 1 : 0.8,
                  position: 'relative',
                  zIndex: hoverIndex === index ? 1 : 0,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                  visibility:
                    index >= visibleStartIndex && index < visibleStartIndex + itemsToShow
                      ? 'visible'
                      : 'hidden',
                }}
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: 'filter 0.5s ease',
                    ...(hoverIndex === index ? { filter: 'brightness(1.2)' } : {}),
                  }}
                  src={item.image}
                  alt={`perfume ${index + 1}`}
                />
                <div
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%)',
                    fontSize: '10px',
                    opacity: 0,
                    transition: 'opacity 0.45s ease',
                    padding: '10px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    ...(hoverIndex === index ? { opacity: 1 } : {}),
                  }}
                >
                  <div
                    style={{
                      paddingTop: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color: '#2ecc71',
                        marginRight: '10px',
                      }}
                      className="fas fa-play-circle"
                    ></span>
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color: '#2ecc71',
                        marginRight: '10px',
                      }}
                      className="fas fa-plus-circle"
                    ></span>
                  </div>
                  <Text
                    style={{
                      color: '#fff',
                      margin: '5px 0',
                      fontSize: '16px',
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      margin: '5px 0',
                      fontSize: '14px',
                    }}
                  >
                    {item.brand}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {visibleStartIndex > 0 && (
          <button
            style={{
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 2,
              left: '20px',
            }}
            onClick={handlePrevClick}
          >
            <span style={{ fontSize: '24px', color: '#000' }}>&#9664;</span>
          </button>
        )}
        {visibleStartIndex < items.length - itemsToShow && (
          <button
            style={{
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 2,
              right: '20px',
            }}
            onClick={handleNextClick}
          >
            <span style={{ fontSize: '24px', color: '#000' }}>&#9654;</span>
          </button>
        )}

        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              overflow: 'hidden',
              animation: modalAnimation ? 'modal-enter 0.5s ease-out' : 'none',
            }}
            onClick={closeModal}
          >
            <div
              style={{
                display: 'flex',
                backgroundColor: 'white',
                borderRadius: '20px',
                width: '80%',
                height: '80%',
                overflow: 'hidden',
                position: 'relative',
                animation: modalAnimation ? 'modal-enter 0.5s ease-out' : 'none',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  flex: 1,
                  backgroundImage: `url(${selectedItem.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  animation: modalAnimation ? 'modal-image 0.5s ease-out' : 'none',
                }}
              />
              <div
                style={{
                  flex: 1,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: 1,
                  transition: 'opacity 0.5s ease',
                }}
              >
                <Text
                  style={{
                    fontSize: '24px',
                    marginBottom: '10px',
                  }}
                >
                  {selectedItem.name}
                </Text>
                <Text
                  style={{
                    fontSize: '20px',
                    color: 'gray',
                  }}
                >
                  {selectedItem.brand}
                </Text>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Main;
