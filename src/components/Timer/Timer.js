import Countdown from 'react-countdown';

const Timer = () => {
    // Random component
const Completionist = () => <span>You ran out of time!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
         
          
          {minutes.length > 1 ? minutes : `0${minutes}`}
          :{seconds.length <= 1 
            ? `0${seconds}`
            : seconds 
            }
         
        </span>
      );
    }
  };
    return (
        <Countdown date={Date.now() + 60000} renderer={renderer} />
    );
};

export default Timer;