import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import CustomNavbar from "./components/Navbar";
import { AuthProvider } from "./components/Auth/AuthContext";
import Logout from "./components/Auth/Logout";
import Footer from "./components/Footer";
import ShowDetails from "./components/ShowNewsById";
import Dashboard from "./components/DashBoard";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <CustomNavbar />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/news/:id" element={<ShowDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
