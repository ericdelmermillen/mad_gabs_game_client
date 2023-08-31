import "./LoginSignup.scss";
import { useState } from "react";

import Google from "../../assets/img/google.png";
import Facebook from "../../assets/img/facebook.png";

const LoginSignup = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);


  const google = () => {
    console.log("from google")
    window.open("http://localhost:5000/auth/google", "_self");
    setisLoggedIn(true)
  };
  
  // const facebook = () => {
    //   window.open("http://localhost:5000/auth/facebook", "_self");
    // };
    
    const logout = () => {
      console.log("from google")
      window.open("http://localhost:5000/auth/logout", "_self");
      setisLoggedIn(false)
  };

  return (
    <div className="loginSignup">
      <div className="loginSignup__card">
      {isLoggedIn 
        ?
          <h3 className="login__status">Logged In: True</h3>
        :
          <h3 className="login__status">Logged In: False</h3>
      }
        <div className="card__column-left">

          <div className="loginButton__google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>

          <div className="logout" onClick={logout}>
            Logout
          </div>

          {/* <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div> */}

        </div>
        {/* <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div> */}

        {/* <div className="card__column-left">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div> */}

      </div>
    </div>
  )};

export default LoginSignup;





