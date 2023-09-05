import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./HamburgerMenu.scss";
import close from "../../assets/icons/close.svg";
import menuIcon from "../../assets/icons/burger.svg";

function HamburgerMenu () {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
        <div className="hamburgeMenu">
          
          <img
            className="hamburgeMenu__menu-bars" 
            src={menuIcon}
            alt="hamburger menu icon"
            onClick={showSidebar} 
          />

        </div>
        <nav className={sidebar ?     
            "hamburgeMenu__slider hamburgeMenu__slider--active" : "hamburgeMenu__slider"}>
          
          <img 
            src={close} 
            alt="hamburger menu close icon"
            className="hamburgeMenu__x" 
            onClick={showSidebar}
          />

        </nav>
    </>
  )}

export default HamburgerMenu;
