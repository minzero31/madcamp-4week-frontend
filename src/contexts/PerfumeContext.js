import React, { createContext, useState, useContext } from 'react';

// Context 생성
const PerfumeContext = createContext();

// Provider 컴포넌트
export const PerfumeProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <PerfumeContext.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </PerfumeContext.Provider>
  );
};

// 커스텀 훅
export const usePerfumeContext = () => useContext(PerfumeContext);
