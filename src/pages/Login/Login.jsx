import React from 'react';
import "./Login.scss";

import Google from "../../assets/img/google.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="login">
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

          <form className="login-form" action="submit">
          
            <label className='login-form__label form__label--email' htmlFor="email">Email</label>
          
            <input className="login-form__input" type="emailt" id="email" placeholder="Email"/>
          
            <label className='login-form__label form__label--password' htmlFor="password">Password</label>
          
            <input className="login-form__input" type="password" id="password" placeholder="Password"/>
          
            <button className="login-form__submit">Login</button>
          </form>

          <span className='signup'>Don't have an account?</span>

        </div>
      </div>
    </div>
  )};

export default Login;
