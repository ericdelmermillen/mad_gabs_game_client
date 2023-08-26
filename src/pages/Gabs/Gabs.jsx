import "./Gabs.scss";

import Gab from '../../components/Gab/Gab';
import Timer from '../../components/Timer/Timer';

import { useState } from 'react';

const Gabs = () => {
  const [ gabIsReady, setGabIsReady ] = useState(false);
  const [ isTimeElapsed, setIsTimeElapsed ] = useState(false);
  
  const duration = 60000;

  const handleGabIsReady = () => setGabIsReady(true);

  gabIsReady && setTimeout(() => setIsTimeElapsed(true), duration);

  return (
      <div>

        { gabIsReady && !isTimeElapsed 
          ? <Timer 
              duration={duration}
            /> 

          :' 00:00'
        }

        <Gab 
          handleGabIsReady={handleGabIsReady}
          isTimeElapsed={isTimeElapsed}
          duration={duration}
        />
      </div>
  )};

export default Gabs;