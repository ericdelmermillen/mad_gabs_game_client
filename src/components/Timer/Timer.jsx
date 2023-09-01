import "./Timer.scss";
import Countdown from 'react-countdown';
import { useEffect } from 'react';

const Timer = ({ duration, setIsTimeElapsed }) => {
  useEffect(() => {
    setIsTimeElapsed(false); 
  }, []);

  const handleCountdownComplete = () => {
    setIsTimeElapsed(true); 
  };

  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    )};

  return <Countdown date={Date.now() + duration} renderer={renderer} onComplete={handleCountdownComplete} />;
};

export default Timer;
