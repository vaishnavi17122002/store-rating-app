import React, {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import "../styles/auth.css";

function Register() {

  const navigate =
  useNavigate();

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      address: "",

      password: "",

    });

  const handleChange =
  (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http://localhost:5000/api/auth/register",

        formData

      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>
          Create Account
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input

            type="text"

            name="name"

            placeholder="Enter Full Name"

            onChange={
              handleChange
            }
          />

          <input

            type="email"

            name="email"

            placeholder="Enter Email"

            onChange={
              handleChange
            }
          />

          <textarea

            name="address"

            placeholder="Enter Address"

            onChange={
              handleChange
            }
          />

          <input

            type="password"

            name="password"

            placeholder="Enter Password"

            onChange={
              handleChange
            }
          />

          <button type="submit">

            Register

          </button>

        </form>

        <div className="auth-link">

          <p>

            Already have account?

            {" "}

            <Link to="/">

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;