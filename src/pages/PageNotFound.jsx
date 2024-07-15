import React, { useEffect } from "react";
import "../assets/pnotfound.css";

const Pnotfound = () => {
  useEffect(() => {
    const errorText = document.querySelector(".error-text");
    errorText.classList.add("animate__animated", "animate__fadeInDown");
    return () => {
      errorText.classList.remove("animate__animated", "animate__fadeInDown");
    };
  }, []);

  return (
    <div className="error-container">
      <h1 className="error-text">404</h1>
      <p className="error-message">Oops! Page not found.</p>
    </div>
  );
};

export default Pnotfound;
