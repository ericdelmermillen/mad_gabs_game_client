import "./Login.scss";

import Google from "../../assets/img/google.png";
// import Facebook from "../../assets/img/facebook.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  // const facebook = () => {
  //   window.open("http://localhost:5000/auth/facebook", "_self");
  // };

  return (
    <div className="login">

      <h1 className="login__title">Choose a Login Method</h1>
      
      <div className="login__inner-container">
      
        <div className="left">
      
          <div className="login__button login__button--google" onClick={google}>
      
            <img src={Google} alt="google icon"className="login__button-icon" />
            Google

          </div>

          {/* <div className="login__button login__button--facebook" onClick={facebook}>
            <img src={Facebook} alt="facebook icon" className="login__button-icon" />
            Facebook
          </div> */}

        </div>

        <div className="or">
          <div className="or__line" />
          <div className="or__text">OR</div>
        </div>

        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  )};

export default Login;