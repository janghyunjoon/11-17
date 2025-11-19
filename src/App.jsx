import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Routes>

      {/* 기본 시작 화면 → Login */}
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
  );
}

export default App;
