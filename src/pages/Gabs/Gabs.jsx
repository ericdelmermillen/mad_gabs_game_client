import "./Gabs.scss";

import Gab from '../../components/Gab/Gab';
import Timer from '../../components/Timer/Timer';

import { useState } from 'react';

const Gabs = () => {
  const [gabIsReady, setGabIsReady] = useState(false);
  const [isTimeElapsed, setIsTimeElapsed] = useState(false);

  const duration = 60000;

  return (
    <div className="gabs">

      <div className="timer__container">

        {gabIsReady ? (
          <Timer 
          duration={duration} 
          setIsTimeElapsed={setIsTimeElapsed}
          />
          ) : (
            ' 00:00'
        )}
      </div>

      <div className="gabs__current-gab">
        <Gab
          setGabIsReady={setGabIsReady}
          isTimeElapsed={isTimeElapsed}
          duration={duration}
          setIsTimeElapsed={setIsTimeElapsed}
          gabIsReady={gabIsReady}
        />
      </div>
      
    </div>
  )};

export default Gabs;
