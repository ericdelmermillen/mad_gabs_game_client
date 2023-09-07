import "./YouGiveUp.scss";
import { Link } from 'react-router-dom';

const YouGiveUp = ({ handleNext }) => {
  return (
    <div className="youGiveUp__card">

      <div className="youGiveUp__container">

      <h1 className="youGiveUp__heading">You Give Up!</h1>

      <p className="youGiveUp__instructions">
        Sorry about your luck.
      </p>

      <p className="youGiveUp__instructions">
        Keep trying and maybe you'll get it next time around.
      </p>

      <div className="button__container">

        <Link className="button--home" 
          to={"/"} >
          Home
        </Link>

        <Link className="button--next"
          onClick={handleNext} 
          >
          Next
        </Link>

      </div>
      </div>

    </div>
  )};

export default YouGiveUp;
