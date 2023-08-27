import "./Gabs.scss";

import Gab from '../../components/Gab/Gab';
import Timer from '../../components/Timer/Timer';

import { useState } from 'react';

const Gabs = () => {
  const [gabIsReady, setGabIsReady] = useState(false);
  const [isTimeElapsed, setIsTimeElapsed] = useState(false);

  const duration = 60000;

  return (
    <div>
      {gabIsReady ? 
      (
        <Timer 
          duration={duration} 
          setIsTimeElapsed={setIsTimeElapsed}
        />
      ) : (
        ' 00:00'
      )}

      <Gab
        setGabIsReady={setGabIsReady}
        isTimeElapsed={isTimeElapsed}
        duration={duration}
        setIsTimeElapsed={setIsTimeElapsed}
        gabIsReady={gabIsReady}
      />
    </div>
  )};

export default Gabs;
