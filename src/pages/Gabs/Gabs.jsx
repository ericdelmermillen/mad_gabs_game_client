import "./Gabs.scss";

import Gab from '../../components/Gab/Gab';
import Timer from '../../components/Timer/Timer';

import YouLose from '../../components/YouLose/YouLose';

import YouGiveUp from '../../components/YouGiveUp/YouGiveUp';

import YouWin from '../../components/YouWin/YouWin';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Gabs = ({ user, setUser, mgUserId }) => {

  const [ currentGab, setCurrentGab ] = useState(null);
  
  const [ gabIsReady, setGabIsReady ] = useState(false);

  const [ isLoading, setIsLoading ] = useState(true);

  const [ isTimeElapsed, setIsTimeElapsed ] = useState(false);

  const [ readyForNext, setReadyForNext ] = useState(false);

  const [ roundOver, setRoundOver ] = useState(false);
  
  const [ startTime, setStartTime ] = useState(null);

  const [ endTime, setEndTime ] = useState(null);

  const [ youGiveUp, setYouGiveUp ] = useState(false);

  const [ youLose, setYouLose ] = useState(false);

  const [ youWin, setYouWin ] = useState(false);


  const { level } = useParams();
  const navigate = useNavigate();  


  const duration = 60000;

  const handleNext = () => {
    setIsLoading(true);
    setCurrentGab(null);
    setReadyForNext(true);
    setRoundOver(false);
    setStartTime(null);
    setYouGiveUp(false);
    setYouWin(false);
    setGabIsReady(false);
    navigate(`/${level}`, { replace: true });
  }  

// ***
  const handleSkip = () => {
    setCurrentGab(null);
    setIsLoading(true);
    setReadyForNext(true);
    setRoundOver(false);
    setStartTime(null);
    setYouGiveUp(false);
    setYouWin(false);
    setGabIsReady(false);
    navigate(`/gabs/${level}`, { replace: true });
  }

  // **
  

  return (
    <div className="gabs">

      <div className="gabs__container">

      { !youWin && youGiveUp && 
        <YouGiveUp 
          handleNext={handleNext} /> 
      }
      
      { !youWin && isTimeElapsed && !youGiveUp && 
        <YouLose 
          handleNext={handleNext} /> 
      }

      { youWin && 
        <YouWin 
          currentGab={currentGab}
          duration={duration}
          handleNext={handleNext} 
          setUser={setUser}
          user={user} 
          mgUserId={mgUserId} 
          startTime={startTime}
          endTime={endTime}
          />
      }

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
            
            user={user}
            setUser={setUser}

            youGiveUp={youGiveUp}
            setYouGiveUp={setYouGiveUp}
            
            youLose={youLose}
            setYouLose={setYouLose}
            
            youWin={youWin}
            setYouWin={setYouWin}

            readyForNext={readyForNext}
            setReadyForNext={setReadyForNext}

            currentGab={currentGab}
            setCurrentGab={setCurrentGab}
            
            roundOver={roundOver}
            setRoundOver={setRoundOver}
            
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            
            startTime={startTime}
            setStartTime={setStartTime}

            handleSkip={handleSkip}

            setEndTime={setEndTime}
          />
        </div>
      </div>
    </div>
  )};

export default Gabs;