import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainTodo from "./pages/MainTodo";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function TodoPage() {
  return (
    <div>
      <Nav className="nav-menu">
        <Link to="/" className="link-menu">홈으로</Link>
        <Link to="/register" className="link-menu">회원가입</Link>
        <Link to="/login" className="link-menu">로그인</Link>
      </Nav>

      <Routes>
        <Route path="/" element={<MainTodo />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default TodoPage;