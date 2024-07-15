import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="navbar fixed-bottom container mb-2"
      style={{ backgroundColor: "#1E90FF", height: "40px" }}
    >
      <div className="text-center d-flex justify-content-center mx-auto align-item-center">
        <p>Stack Solvers Task Requirements @2024</p>
      </div>
    </footer>
  );
};

export default Footer;
