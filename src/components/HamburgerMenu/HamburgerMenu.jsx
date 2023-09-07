import "./HamburgerMenu.scss";


import power from "../../assets/icons/power.svg";
import submit from "../../assets/icons/submit.svg";

import { useState, useEffect } from "react";
import { Link, navigate } from "react-router-dom";


import close from "../../assets/icons/close.svg";
import menuIcon from "../../assets/icons/burger.svg";

function HamburgerMenu ({showSubmitGab, setShowSubmitGab, user, setUser, mgUserId}) {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const handleHamburgerSubmit = () => {
    showSidebar();
    setShowSubmitGab(!showSubmitGab)

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

            {/* <ul className="hamburgerMenu__levels">
              <li className="hamburgerMenu__level">Easy</li>
              <li className="hamburgerMenu__level">Medium</li>
              <li className="hamburgerMenu__level">Hard</li>
            </ul> */}

            <Link 
              className="hamburgerMenu__play"
              to="/gabs"
              onClick={showSidebar}
              >
                Play
            </Link>

            

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

            <span 
              className="hamburgerMenu__action"
              onClick={handleHamburgerSubmit}>

              <img className="hamburgerMenu__action hamburgerMenu__action--icon" 
                src={submit} 
                alt="submit icon"/>

              Submit
            </span>

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
