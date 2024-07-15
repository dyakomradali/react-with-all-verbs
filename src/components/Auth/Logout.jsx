import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null;
};

export default Logout;
