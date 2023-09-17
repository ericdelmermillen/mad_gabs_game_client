import "./HamburgerMenu.scss";

import power from "../../assets/icons/power.svg";
import submit from "../../assets/icons/submit.svg";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

import close from "../../assets/icons/close.svg";
import menuIcon from "../../assets/icons/burger.svg";

function HamburgerMenu ({showSubmitGab, setShowSubmitGab, user, setUser, mgUserId, level, setLevel, setIsLoading}) {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const location = useLocation();

  const BASE_URL = 'https://mad-gabs-game-server-a3fe555ec3c0.herokuapp.com/';
  // const BASE_URL = 'http://localhost:5000/';


  const handleEnterUsername = () => {
    toast("🙄 Please enter a Username...");
    
    setTimeout(() => {
      showSidebar();
    }, 500)
  }


  const handleNoLevelSelected = () => {
    toast('🙄 Please select a Level first...', {
    toastId: 'noLevelSelectedToast',});
  }

  const logout = () => {
    sessionStorage.removeItem('token');
    window.open(`${BASE_URL}auth/logout`, "_self");
  };

  const handleHamburgerSubmit = () => {
    showSidebar();
    setShowSubmitGab(!showSubmitGab);
  };

  useEffect(() => {
    setUser(user)
    return () => {
    };
  }, [user]);


  return (
    <>
        <div className="hamburgerMenu">
          
          <img
            className="hamburgerMenu__menu-bars" 
            src={menuIcon}
            alt="hamburger menu icon"
            onClick={showSidebar} 
          />

        </div>

        <nav className={sidebar ?     
            "hamburgerMenu__slider hamburgerMenu__slider--active" : "hamburgerMenu__slider"}>
          

          <img 
            src={close} 
            alt="hamburger menu close icon"
            className="hamburgerMenu__x" 
            onClick={showSidebar}
          />

          <div className="hamburgerMenu__content-container">

            <ul className="hamburgerMenu__levels">

              {level === "easy" 

              ?
              
              <li className=" hamburgerMenu__level-option--selected" 
                onClick={() => setLevel("easy")}>
                  Easy
              </li>
              :

              <li className="hamburgerMenu__level-option" 
                onClick={() => setLevel("easy")}>
                  Easy
              </li>
              }
             
              {level === "medium" 

              ?

              <li className=" hamburgerMenu__level-option--selected" 
                onClick={() => setLevel("medium")}>
                  Medium
              </li>
              :

              <li className=" hamburgerMenu__level-option" 
                onClick={() => setLevel("medium")}>
                  Medium
              </li>
            }
             
              {level === "hard" 

              ?

              <li className=" hamburgerMenu__level-option--selected" 
                onClick={() => setLevel("hard")}>
                  Hard
              </li>
              :

              <li className=" hamburgerMenu__level-option" 
                onClick={() => setLevel("hard")}>
                  Hard
              </li>
            }

            </ul>

            {!user.userName ?

            <Link 
              className="hamburgerMenu__play"
              onClick={handleEnterUsername}>
              Play
            </Link>

            : level !== "" ?

            <Link 
              className="hamburgerMenu__play"
              onClick={showSidebar}
              to={`/gabs/${level}`}>
              Play
            </Link>

            :

            <Link 
              className="hamburgerMenu__play--disabled"
              onClick={handleNoLevelSelected}
              >
              Play
            </Link>

            }
            

            <ul className="hamburgerMenu__stats">

              <li className="hamburgerMenu__stat">User Name: 
              {/* {user.userName */}
              {user.userName
              
              ?
                  <span className="hamburgerMenu__statSpan"> {user.userName}</span>
                  :
                  <span className="hamburgerMenu__statSpan"> Not Set</span>
              }
              </li>

              <li className="hamburgerMenu__stat">Total Score: 
                  <span className="hamburgerMenu__statSpan"> {user.totalPoints}</span>
              </li>

              <li 
                className="hamburgerMenu__stat">
                  Global Rank: 

                  {user.ranking
                  
                  ?
                  
                  <span className="hamburgerMenu__statSpan"> 
                      {user.ranking.userRank} / {user.ranking.totalPlayers}</span>

                      :
                  <span className="hamburgerMenu__statSpan"> NA</span>

                  }
              </li>
            </ul>

            {user.userName 

            ?

            <span 
              className="hamburgerMenu__action"
              onClick={handleHamburgerSubmit}>

              <img className="hamburgerMenu__action hamburgerMenu__action--icon" 
                src={submit} 
                alt="submit icon"/>

              Submit
            </span>

            :

            <span 
              className="hamburgerMenu__action"
              onClick={handleEnterUsername}>

              <img className="hamburgerMenu__action hamburgerMenu__action--icon" 
                src={submit} 
                alt="submit icon"/>

              Submit
            </span>

            }

            <span 
              className="hamburgerMenu__action"
              onClick={logout}>
                    
              <img className="hamburgerMenu__action hamburgerMenu__action--icon" 
                src={power} 
                alt="logout icon"/>
              Logout
            </span>
          </div>

        </nav>
    </>
  )};

export default HamburgerMenu;
