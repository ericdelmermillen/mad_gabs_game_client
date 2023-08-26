import Countdown from 'react-countdown';

const Timer = ({duration}) => {

  const renderer = ({ minutes, seconds, completed }) => {
    return (
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    )};

  return <Countdown date={Date.now() + duration} renderer={renderer} />;
};

export default Timer;