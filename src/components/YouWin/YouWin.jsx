import "./YouWin.scss";
import { Link } from 'react-router-dom';

const YouWin = ({ currentGab, duration, handleNext, roundTime }) => {
  const [currentGabQuestion, currentGabAnswer] = currentGab;
  const msToSeconds = (ms) => Math.round(ms / 100) / 10;

  const getPoints = (secondsRemaining) => {
    return secondsRemaining > 60 
      ? 100
      : Math.round(100 - 100 / 60 * (60 - secondsRemaining)); 
  }

  const secondsRemaining = msToSeconds(duration) - roundTime;

  return (
    <div className="youWin__card">

      <h1 className="youWin__heading">You Win!</h1>
      
      <p className="youWin__question">Gab: 
        "{`${currentGabQuestion.join(" ")}`}"
      </p>

      <p className="youWin__answer">Answer: "

        {
          currentGabAnswer.map((word, index) =>
          <span className="youWin__answer--word" key={index}>{word.slice(0, 1).toUpperCase() + word.slice(1)}</span>)
        }"
      </p>
      
      <p className="youWin__time">Time Elapsed: {roundTime} Seconds</p>

      <p className="youWin__points">Points Earned: {getPoints(secondsRemaining)}</p>

      <div className="button__container">

        <Link className="button--home" 
          to={"/"} >
          Home
        </Link>

        <Link className="button--next"
          onClick={handleNext} >
          Next
        </Link>

      </div>

    </div>
  )};

export default YouWin;