import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './YouWin.scss';

const YouWin = ({ currentGab, duration, handleNext, roundTime, user, setUser, mgUserId }) => {
  const [currentGabQuestion, currentGabAnswer] = currentGab;
  const msToSeconds = (ms) => Math.round(ms / 100) / 10;

  const [isLoading, setIsLoading] = useState(true);


  const getPoints = async (secondsRemaining, user) => {
    try {
      const token = sessionStorage.getItem('token');

      if(!token) {
        throw new Error("No token found");
      }

      const response = await axios.post('http://localhost:5000/users/post-points', {
        secondsRemaining,
        mgUserId: mgUserId,
      }, {headers: { Authorization: `Bearer ${token}`}
    })

      const data = response.data;

      setUser(data.user)
      return data.points;
    } catch (error) {
      window.open("http://localhost:5000/auth/logout", "_self");
      console.error('Error fetching points:', error);
      return null;
    }
  };

  useEffect(() => {
    const secondsRemaining = msToSeconds(duration) - roundTime;

    getPoints(secondsRemaining)
      .then((result) => {
          setIsLoading(false);; 
      })
      .catch((error) => {
        console.error(error);
          setIsLoading(false);
      });
  }, [duration, roundTime]);

  return (
    <div className="youWin">

      <div className="youWin__container">

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
    </div>
  )};

export default YouWin;
