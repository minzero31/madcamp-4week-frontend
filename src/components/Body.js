// src/components/Body.js
import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Body = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

export default Body;
