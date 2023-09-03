import "./NavBar.scss";

// import logo from "../../assets/logo/1.svg";
// import logo from "../../assets/logo/4.svg";
import logo from "../../assets/logo/8.svg";

import submit from "../../assets/icons/submit.svg";
import power from "../../assets/icons/power.svg";

import { Link, useLocation } from "react-router-dom";

import { Flip, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ showSubmitGab, setShowSubmitGab, user }) => {

  const location = useLocation();

  // const showPleaseLoginToast 
  const showPleaseLoginToast = () => {
    toast("🙄 Please Login to play...");
    console.log("from home")
  }
  
  const showAlreadyOnLoginToast = () => {
    toast("🙄 Already on Login...");
    console.log("from login")
  }

  const showAlreadyOnHomeToast = () => {
    toast("🙄 Already on Home...");
  }

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="navBar">

      {user ? (

      <>
        <p className="navBar__userName">Username : {user.userName}</p>

        {location.pathname.includes("home")
          ?
            <Link className="navBar__logo" 
              onClick={showAlreadyOnHomeToast}>
              <img className="navBar__logo-img" src={logo} alt="Logo"/>
            </Link>
          :
            <Link className="navBar__logo" to="/home">
              <img className="" src={logo} alt="Logo"/>
            </Link>
        }

        <ul className="navBar__actions">
          <li 
            className="navBar__action--submit" 
            onClick={() => setShowSubmitGab(!showSubmitGab)}>

            <img className="navBar__submit-icon" 
              src={submit} 
              alt="submit icon"
            />
              Submit
          </li>

          <li 
            className="navBar__action--logout" onClick={logout}>
                
            <img className="navBar__logout-icon" 
              src={power} 
              alt="logout icon"
            />
              Logout
          </li>
        </ul>
        </>

          ) : (

      <>

        <p className="navBar__userName">Username : Not Logged In</p>
          
        <Link 
          className="navBar__logo" 
          onClick={showPleaseLoginToast}
        >
            
            <img 
              className="navBar__logo-img" 
              src={logo} alt="Logo"/>

        </Link>


        <ul className="navBar__actions">

          <li 
            className="navBar__action--login" 
            onClick={showAlreadyOnLoginToast}>
                
            <img 
              className="navBar__login-icon" 
              src={power} 
              alt="logout icon"
            />
              Login
          </li>
        </ul>
      </>

      )}

      <div className="toastBox">
        <ToastContainer
          autoClose={2000}
          closeOnClick
          draggable
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          position="bottom-center"
          theme="light"
          className="navBar__toast"
          bodyStyle={{color: "#333"}}
          transition={Flip}
        />
      </div>
      
    </div>
  )};

export default Navbar;