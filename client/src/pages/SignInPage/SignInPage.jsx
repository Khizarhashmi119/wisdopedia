import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { signInAdminAction } from "../../store/actions/authActions";

import "./SignInPage.css";

const SignInPage = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInAdminAction(signInFormData.email, signInFormData.password));
  };

  return !isAuthenticated ? (
    <div className="sign-in-page">
      <h2>Signin using email and password.</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={signInFormData.email}
          id="sign-in-email"
          placeholder="Email*"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={signInFormData.password}
          id="sign-in-password"
          placeholder="Password*"
          onChange={handleChange}
          required
        />
        <small>* required fields</small>
        <button id="sign-in-btn" type="submit">
          SIGN IN
        </button>
      </form>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default SignInPage;
