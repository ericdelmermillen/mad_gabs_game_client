import "./Gabs.scss";

import Gab from '../../components/Gab/Gab';
import Timer from '../../components/Timer/Timer';

import { useState } from 'react';

const Gabs = ({ user, setUser, mgUserId }) => {
  const [ gabIsReady, setGabIsReady ] = useState(false);
  const [ isTimeElapsed, setIsTimeElapsed ] = useState(false);

  const duration = 60000;

  return (
    <div className="gabs">

      <div className="gabs__container">

        <div className="timer__container">
          <h2 className="timer__header">
            Time Remaining:
          </h2>

          <div className="timer__countdown">

            {gabIsReady ? 

              <Timer 
                duration={duration} 
                setIsTimeElapsed={setIsTimeElapsed}
                className="timer__countdown"
              />

              : 
                '00:00'
            }

          </div>
        </div>

        <div className="gabs__current-gab">
          <Gab
            duration={duration}
            isTimeElapsed={isTimeElapsed}
            mgUserId={mgUserId}
            setGabIsReady={setGabIsReady}
            setUser={setUser}
            user={user}
          />
        </div>
      </div>
    </div>
  )};

export default Gabs;