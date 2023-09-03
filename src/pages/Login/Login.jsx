import "./Login.scss";
import Google from "../../assets/img/google.png";

import React from 'react';
import axios from 'axios';

import { useState } from "react";

const Login = ({ setUser, user }) => {

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    // console.log("from handleSubmit")
    // console.log(email, " ", password)

    if (email === "" || password === "") {
      // toast.error("🙄 All fields are required...");
      console.log("email or password missing")
      return;
    } 
      
    try {
      const response = await axios.post(`http://localhost:5000/auth/user`, {
        email: email,
        password: password,
    });
      setUser(response.data.user);
      
      // console.log("Server response:", response.data.user);
      // setShowSubmitGab(!showSubmitGab)      
      // toast.success("🤓 Thanks for the Gab!");
      
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(user)
  };

  return (
    <div className="login">

      <div className="login__outer-container">

      <h1 className="login__title">Choose a Login Method</h1>
      
        <div className="login__inner-container">

          <div className="inner-container__left">
            <div className="login__button login__button--google" onClick={google}>
              <img src={Google} alt="google icon" className="login__button-icon" />
              Google
            </div>
          </div>
          <div className="or">
            <div className="or__line" />
            <div className="or__text">OR</div>
          </div>
          <div className="inner-container__right">
            <form 
              className="login-form" 
              onSubmit={handleEmailLogin}
            >
        
              <label className='login-form__label form__label--email' htmlFor="email">Email</label>
        
              <input 
                className="login-form__input" 
                type="emailt" 
                id="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
        
              <label className='login-form__label form__label--password' htmlFor="password">Password</label>
        
              <input 
                className="login-form__input" 
                type="password" 
                id="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
        
              <button className="login-form__submit">
                Login</button>
            </form>
            <span className='signup__link'>Don't have an account?</span>
          </div>

        </div>

      </div>
    </div>
  )};

export default Login;
