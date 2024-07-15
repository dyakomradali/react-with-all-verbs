import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./Auth/AuthContext";
const CustomNavbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <nav className="navbar container my-1 bg-primary p-2 text-white bg-opacity-10">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand mx-auto text-center">
          <span>Simple News</span>
        </a>
        {isLoggedIn ? (
          <>
            <Link to="/logout" className="btn btn-success mx-1">
              Logout
            </Link>

            <Link to="/dashboard" className="btn btn-success">
              dashboard
            </Link>
          </>
        ) : (
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
