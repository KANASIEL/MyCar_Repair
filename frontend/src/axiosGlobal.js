// src/axiosGlobal.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8484";
axios.defaults.withCredentials = true; // ⭐ 세션 쿠키 필요

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
