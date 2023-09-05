import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './YouWin.scss';

const YouWin = ({ currentGab, duration, handleNext, roundTime, user, setUser, mgUserId }) => {
  const [currentGabQuestion, currentGabAnswer] = currentGab;
  const msToSeconds = (ms) => Math.round(ms / 100) / 10;

  console.log(user)

  const [isLoading, setIsLoading] = useState(true);


  const getPoints = async (secondsRemaining, user) => {
    try {
      const response = await fetch('http://localhost:5000/users/post-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secondsRemaining, mgUserId: mgUserId }),
      });

      const data = await response.json();
      // needs to update user in state for dashboard to update)
      console.log(data)
      setUser(data.user)
      return data.points;
    } catch (error) {
      console.error('Error fetching points:', error);
      return null;
    }
  };

  useEffect(() => {
    const secondsRemaining = msToSeconds(duration) - roundTime;

    getPoints(secondsRemaining)
      .then((result) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [duration, roundTime]);

  return (
    <div className="youWin__card">
      <h1 className="youWin__heading">You Win!</h1>

      <p className="youWin__question">
        Gab: "{`${currentGabQuestion.join(' ')}`}"
      </p>

      <p className="youWin__answer">
        Answer: "
        {currentGabAnswer.map((word, index) => (
          <span
            className="youWin__answer--word"
            key={index}
          >
            {word.slice(0, 1).toUpperCase() + word.slice(1)}
          </span>
        ))}
        "
      </p>

      <p className="youWin__time">Time Elapsed: {roundTime} Seconds</p>

      <p className="youWin__points">
        Points Earned: {isLoading ? 'Loading...' : user.points}
      </p>

      <div className="youWin button__container">
        <Link className="button--home" to={'/'}>
          Home
        </Link>

        <Link className="button--next" onClick={handleNext}>
          Next
        </Link>
      </div>
    </div>
  )};

export default YouWin;
