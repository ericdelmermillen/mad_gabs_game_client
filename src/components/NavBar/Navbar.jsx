import "./NavBar.scss";

import logo from "../../assets/logo/logo.svg";
import power from "../../assets/icons/power.svg";
import submit from "../../assets/icons/submit.svg";

import { Link, useLocation } from "react-router-dom";

import { toast } from 'react-toastify';

const Navbar = ({ showSubmitGab, setShowSubmitGab, user, setLevel, setIsLoading }) => {

  const location = useLocation();

  const handleEnterUsername = () => {
    toast("🙄 Please enter a Username...");
  }
  
  const handleAlreadyOnHome = () => {
    setLevel("");
    toast("🙄 Already on Home...");
  }
  
  const handlePleaseLogin = () => {
    toast("🙄 Please Login to Continue...");
  }
  
  const handleAlreadyOnLogin = () => {
    toast("🙄 Already on Login Page...");
  }

  const handleNavigateToHome = () => {
    setIsLoading(true);
    setLevel("");
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const BASE_URL = 'https://mad-gabs-game-server-a3fe555ec3c0.herokuapp.com/';
  // const BASE_URL = 'http://localhost:5000/';


  const logout = () => {
    sessionStorage.removeItem('token');
    window.open(`${BASE_URL}auth/logout`, "_self");
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
            onClick={handleEnterUsername}>
            <img className="navBar__logo-img" src={logo} alt="Logo"/>
          </Link>
          
          : 

          <Link 
            className="navBar__logo" 
            onClick={handleNavigateToHome}
            to="/home"
            >
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
            onClick={() => handleEnterUsername(!showSubmitGab)}>

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