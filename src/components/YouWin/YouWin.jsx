import './YouWin.scss';

import axios from 'axios';

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

import { Link } from 'react-router-dom';

const YouWin = ({ currentGab, duration, endTime, handleNext, roundTime, user, setUser, mgUserId, startTime, handleClickedHome }) => {
  const [ currentGabQuestion, currentGabAnswer ] = currentGab;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ pointsAreReady, setPointsAreReady ] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  
  const msToSeconds = (ms) => Math.round(ms / 100) / 10;

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getPoints = async (secondsRemaining, user) => {
    try {
      const token = sessionStorage.getItem('token');

      if(!token) {
        throw new Error("No token found");
      }
      const response = await axios.post(`${BASE_URL}users/post-points`, {
        secondsRemaining,
        mgUserId: mgUserId,
      }, {headers: { Authorization: `Bearer ${token}`}
    })
      const data = response.data;
      
      setUser(data.user);

      setTimeout(() => {
        setPointsAreReady(!pointsAreReady);
      }, 500);

      return data.points;
    } catch (error) {
      console.error('Error fetching points:', error);
      return null;
    }
  };

  useEffect(() => {
    const secondsRemaining = msToSeconds((duration) - (endTime - startTime));

    getPoints(secondsRemaining)
      .then((result) => {
          setIsLoading(false); 
      })
      .catch((error) => {
        console.error(error);
          setIsLoading(false);
      });
  }, [duration, roundTime, endTime, startTime]);


  useEffect(() => {
    const confettiTimeout = setTimeout(() => {
      console.log("showConfetti: ", showConfetti)
      setShowConfetti(false);
    }, 5000); 
    return () => clearTimeout(confettiTimeout);
  }, []); 
  
  return (
    <div className="youWin">

      <div className="youWin__container">

        <h1 className="youWin__heading">You Win!</h1>

        {showConfetti ?
        
          <Confetti 
            className='confetti--show'
            width={800} 
            height={800} 
            numberOfPieces={1000} />
            
          :
        
          <Confetti 
            className='confetti--hide'
            width={800} 
            height={800} 
            numberOfPieces={500} />
        }

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

        <p className="youWin__time">Time Elapsed: {msToSeconds(endTime - startTime)} Seconds</p>

        <p className="youWin__points">
          Points Earned: {isLoading ? 'Loading...' : user.points}
        </p>

        <div className="youWin button__container">
          <Link 
            className="button--home" 
            onClick={handleClickedHome}
            >
            Home
          </Link>

          {pointsAreReady 

          ?

          <Link className="button--next" onClick={handleNext}>
            Next
          </Link>

          :

          <Link className="button--next" onClick={() => console.log("Hold on bro")}>
            Next
          </Link>

          }
        </div>
      </div>
    </div>
  )};

export default YouWin;