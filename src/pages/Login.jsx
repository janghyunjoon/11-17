import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import img1 from "../assets/image1.jpeg";
import img2 from "../assets/image2.jpeg";
import img3 from "../assets/image3.jpeg";

const imageList = [img1, img2, img3];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // 🔄 자동 이미지 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRemember(checked);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/api/user/login`, formData, {
        withCredentials: true,
      });

      const { token } = res.data || {};
      if (!token) throw new Error("토큰이 없습니다.");

      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div className="page-wrapper">
      {/* LEFT LOGIN AREA */}
      <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="remember-row">
            <input
              type="checkbox"
              checked={remember}
              onChange={handleChange}
            />
            비밀번호 기억하기
          </label>

          <button type="submit" className="login-btn">
            Login
          </button>

          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        {/* Divider */}
        <div className="social-divider">
          <span>Or login with</span>
        </div>

        {/* Social buttons */}
        <div className="social-login-box">
          <button className="social-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="fb" />
          </button>

          <button className="social-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="google" />
          </button>

          <button className="social-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="apple" />
          </button>
        </div>

        <button className="back-button" onClick={() => navigate("/")}>
          ← 메인으로 돌아가기
        </button>
      </div>

      {/* RIGHT IMAGE SLIDER */}
      <div className="slider-container">
        <img
          src={imageList[current]}
          alt="slide"
          className="slide-image"
        />

        <div className="indicator-box">
          {imageList.map((_, i) => (
            <div
              key={i}
              className={`indicator ${current === i ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
