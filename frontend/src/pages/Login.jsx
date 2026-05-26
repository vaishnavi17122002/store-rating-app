import React, {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
} from "react-router-dom";

import "../styles/auth.css";

function Login() {

  const [formData,
    setFormData] =
    useState({

      email: "",

      password: "",

    });

  // =========================
  // Handle Input Change
  // =========================

  const handleChange =
  (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };

  // =========================
  // Handle Login
  // =========================

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
      await axios.post(

        "http://localhost:5000/api/auth/login",

        formData

      );

      // Save Token

      localStorage.setItem(

        "token",

        res.data.token

      );

      // Save User

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      );

      alert(
        "Login Successful"
      );

      // Force Refresh

      window.location.href = "/";

    } catch (error) {

      alert(

        error.response?.data?.message

        ||

        "Server Error"

      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>
          Store Rating App
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* Email */}

          <input

            type="email"

            name="email"

            placeholder="Enter Email"

            onChange={
              handleChange
            }
          />

          {/* Password */}

          <input

            type="password"

            name="password"

            placeholder="Enter Password"

            onChange={
              handleChange
            }
          />

          {/* Button */}

          <button type="submit">

            Login

          </button>

        </form>

        {/* Register Link */}

        <div className="auth-link">

          <p>

            Don't have account?

            {" "}

            <Link to="/register">

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;