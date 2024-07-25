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
    // 토큰을 로컬 스토리지에서 가져오기
    const serverAccessToken = localStorage.getItem('serverAccessToken');
    const githubAccessToken = localStorage.getItem('githubAccessToken');

    // 서버 액세스 토큰이 있으면 Authorization 헤더에 추가
    if (serverAccessToken) {
      config.headers['Authorization'] = `Bearer ${serverAccessToken}`;
    }

    // GitHub 액세스 토큰이 있으면 별도의 헤더에 추가
    if (githubAccessToken) {
      config.headers['githubAccessToken'] = githubAccessToken;
    }

    return config;
  },
  error => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
