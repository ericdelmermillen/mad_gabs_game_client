import "./Gabs.scss";

import Gab from '../../components/Gab/Gab';
import Timer from '../../components/Timer/Timer';
import { Link } from 'react-router-dom';


import logo from "../../assets/logo/logo.svg";

import { useState } from 'react';

const Gabs = ({ user, setUser, mgUserId }) => {
  const [gabIsReady, setGabIsReady] = useState(false);
  const [isTimeElapsed, setIsTimeElapsed] = useState(false);

  const duration = 60000;

  return (
    <div className="gabs">
      
      <Link to="/home">
        <img 
          className="gabs__logo" 
          src={logo} 
          alt="Logo"
        />
      </Link>

      <div className="timer__container">
        <h2 className="timer__header">
          Time Remaining:
        </h2>

        <div className="timer__countdown">
          {gabIsReady ? (

            <Timer 
            duration={duration} 
            setIsTimeElapsed={setIsTimeElapsed}
            className="timer__countdown"
            />
            ) : (
              ' 00:00'
          )}
        </div>
      </div>

      <div className="gabs__current-gab">
        <Gab
          setGabIsReady={setGabIsReady}
          isTimeElapsed={isTimeElapsed}
          duration={duration}
          setIsTimeElapsed={setIsTimeElapsed}
          gabIsReady={gabIsReady}
          user={user}
          setUser={setUser}
          mgUserId={mgUserId}
        />
      </div>
      
    </div>
  )};

export default Gabs;
