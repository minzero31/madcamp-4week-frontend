// src/services/axiosInstance.js
import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // 환경 변수를 사용하여 baseURL 설정
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    // 요청 전에 수행할 작업이 필요 없다면 이 부분을 비워둡니다.
    return config;
  },
  error => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
