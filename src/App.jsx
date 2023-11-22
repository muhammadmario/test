import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BlogPage from "./pages/BlogPage";
import FilterDataPage from "./pages/FilterDataPage";
import Navbar from "./organisms/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/filtered" element={<FilterDataPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
