import "./Login.scss";
import Google from "../../assets/img/google.png";

import React from 'react';
import axios from 'axios';

import { useState } from "react";

import { toast } from 'react-toastify';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  

  const handleGoogleLoginSignUp = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };


  // email Login
  const handleEmailLogin = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      console.log("No email or password")
      toast.error("🙄 All fields are required...");
      return
    } 
      
    try {
      const response = await axios.post(`http://localhost:5000/auth/user/login`, {
        email: email,
        password: password,
    })
      sessionStorage.setItem('token', response.data.token);
      setUser(response.data.user);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  // email signup adds token to session storage
  const handleEmailSignup = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("🙄 All fields are required...");
      console.log("email or password missing")
      return;
    } 
      
    try {
      const response = await axios.post(`http://localhost:5000/auth/user/signup`, {
        email: email,
        password: password,
    });

      sessionStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">

      <div className="login__container">

      <h1 className="login__title">Choose a Login Method</h1>

        <div className="login__inner-container">

          <div className="inner-container__left">

            <span className="login__button login__button--google" onClick={handleGoogleLoginSignUp}>
              Google
            </span>

          </div> 

          <div className="or">
            <div className="or__line or__line--above" />
            <div className="or__text">OR</div>
            <div className="or__line or__line--below" />
          </div> 

          { showLogin 
          
            ?

            <div className="inner-container__right">

              <form 
                className="login-form" 
                onSubmit={handleEmailLogin}>
          
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
                  Login
                </button>

              </form> 

              <span 
                className='signup__link'
                onClick={() => setShowLogin(!showLogin)}>
                  Don't have an account?
              </span>

            </div>

            :
            
            <div className="inner-container__right">

              <form 
                className="login-form" 
                onSubmit={handleEmailSignup}>
          
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
                  Signup</button>
              </form>

              <span 
                className='signup__link'
                onClick={() => setShowLogin(!showLogin)}>
                  Already signed up?
              </span>
              
            </div>

          }

        </div>

      </div>

    </div>
  )};

export default Login;