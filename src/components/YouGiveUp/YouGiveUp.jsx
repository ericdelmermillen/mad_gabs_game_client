import "./YouGiveUp.scss";
import { Link } from 'react-router-dom';

const YouGiveUp = ({ handleNext }) => {
  return (
    <div className="youGiveUp__card">

      <h1 className="youGiveUp__heading">You Give Up!</h1>

      <p className="youGiveUp__question">Gab: </p>

      <p className="youGiveUp__answer">Answer: </p>

      <p className="youGiveUp__points">Points Earned: </p>


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

export default YouGiveUp;
