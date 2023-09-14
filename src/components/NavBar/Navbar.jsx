import "./NavBar.scss";

import logo from "../../assets/logo/logo.svg";
import power from "../../assets/icons/power.svg";
import submit from "../../assets/icons/submit.svg";

import { Link, useLocation } from "react-router-dom";

import { toast } from 'react-toastify';

const Navbar = ({ showSubmitGab, setShowSubmitGab, user }) => {

  const location = useLocation();

  const handlePleaseFinishTutorial = () => {
    // return toast("🙄 Please finish the tutorial...");
  }
  
  const handleAlreadyOnHome = () => {
    // return toast("🙄 Already on Home...");
  }
  
  const handlePleaseLogin = () => {
    toast("🙄 Please Login to Continue...");
  }
  
  const handleAlreadyOnLogin = () => {
    toast("🙄 Already on Login Page...");
  }

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="navBar">

      {user ? 

      <>

        {user.userName 

          ?

          <p className="navBar__userName">Username : {user.userName}</p>
          
          :
        
          <p className="navBar__userName">Username : Not Set</p>
          
        }

        {user.userName && location.pathname.includes('home')

          ? 

          <Link className="navBar__logo" 
            onClick={handleAlreadyOnHome}>
            <img className="navBar__logo-img" src={logo} alt="Logo"/>
          </Link>

      
          : location.pathname.includes('welcome')?
              
          <Link className="navBar__logo" 
            onClick={handlePleaseFinishTutorial}>
            <img className="navBar__logo-img" src={logo} alt="Logo"/>
          </Link>
          
          : 

          <Link className="navBar__logo" to="/home">
            <img className="navBar__logo-img" src={logo} alt="Logo"/>
          </Link>
    }

        <ul className="navBar__actions">
        
        {user.userName 

          ?

          <li 
            className="navBar__action--submit" 
            onClick={() => setShowSubmitGab(!showSubmitGab)}>

            <img className="navBar__submit-icon" 
              src={submit} 
              alt="submit icon"
            />
              Submit
          </li>

          :

          <li 
            className="navBar__action--submit" 
            onClick={() => handlePleaseFinishTutorial(!showSubmitGab)}>

            <img className="navBar__submit-icon" 
              src={submit} 
              alt="submit icon"
            />
              Submit!
          </li>
        }

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

        : 

      <>

        <p className="navBar__userName">Username : Not Logged In</p>
          
        <Link 
          className="navBar__logo" 
          onClick={handlePleaseLogin}>
            <img 
              className="navBar__logo-img" 
              src={logo} alt="Logo"/>
        </Link>


        <ul className="navBar__actions">

          <li 
            className="navBar__action--login" 
            onClick={handleAlreadyOnLogin}
          >
                
            <img 
              className="navBar__login-icon" 
              src={power} 
              alt="login icon"
            />
              Login
          </li>
        </ul>
      </>

      }
      
    </div>
  )};

export default Navbar;