import React, { useState, useEffect } from "react";
import "./PaymentPage.scss";

import img1 from "../../assets/image1.jpeg";
import img2 from "../../assets/image2.jpeg";
import img3 from "../../assets/image3.jpeg";

const imageList = [img1, img2, img3];

const PaymentPage = () => {
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({
    cardNumber: "",
    exp: "",
    cvc: "",
    name: "",
    country: "",
    autoPay: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("결제수단이 추가되었습니다!");
  };

  return (
    <div className="payment-wrapper">

      {/* LEFT IMAGE SLIDER */}
      <div className="slider-container">
        <img src={imageList[current]} className="slide-image" />
        <div className="indicator-box">
          {imageList.map((_, i) => (
            <div
              key={i}
              className={`indicator ${current === i ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT PAYMENT FORM */}
      <div className="payment-container">
        <div className="back-btn">← Back</div>

        <h1 className="title">결제수단 추가</h1>
        <p className="sub">결제수단을 추가해주세요</p>

        <form className="payment-form" onSubmit={handleSubmit}>

          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="4321 4321 4321 4321"
            value={form.cardNumber}
            onChange={handleChange}
          />

          <div className="row">
            <div className="column">
              <label>Exp. Date</label>
              <input
                type="text"
                name="exp"
                placeholder="02/27"
                value={form.exp}
                onChange={handleChange}
              />
            </div>

            <div className="column">
              <label>CVC</label>
              <input
                type="text"
                name="cvc"
                placeholder="123"
                value={form.cvc}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Name on Card</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />

          <label>Country or Region</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
          >
            <option value="">Choose Country</option>
            <option value="kr">Korea</option>
            <option value="us">United States</option>
            <option value="jp">Japan</option>
          </select>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="autoPay"
              checked={form.autoPay}
              onChange={handleChange}
            />
            재청구시 one 터치로 결제하기
          </label>

          <button type="submit" className="pay-btn">
            결제수단 추가
          </button>
        </form>

        <p className="info">
          By confirming your subscription, you allow this service to charge your
          card for this payment and future payments. You can always cancel your subscription.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
