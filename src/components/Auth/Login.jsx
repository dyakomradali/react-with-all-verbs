import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AuthContext from "./AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(

        "http://localhost:5210/api/Account/Login",
        formData
      );
      const token = response.data.token;
      if (token) {
        login(token);
        setFormData({ username: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          setErrors({ message: "Username or password incorrect" });
        } else if (status === 400) {

          const errorMessages = Object.keys(data.errors)
            .map((key) => data.errors[key].join(", "))
            .join(", ");
          setErrors({ message: errorMessages });
        } else {
          console.log("Error status:", status);
        }
      } else {
        console.log("Network error or other:", error.message);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <div
        className="card"
        style={{
          width: "30rem",
          background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
        }}
      >
        <div className="card-body">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-12">
                <form className="p-5" onSubmit={handleLogin}>
                  <div className="mb-5">
                    <h3>Login Page</h3>
                  </div>
                  {errors.message && (
                    <div className="text-danger">
                      <p>{errors.message}</p>
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      required
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      id="exampleInputPassword1"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-3"
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
