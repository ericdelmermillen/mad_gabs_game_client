import React from 'react';
import Countdown from 'react-countdown';

const Timer = () => {

  const Completionist = () => <span>You ran out of time!</span>;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      )};
  };

  return <Countdown date={Date.now() + 60000} renderer={renderer} />;
};

export default Timer;