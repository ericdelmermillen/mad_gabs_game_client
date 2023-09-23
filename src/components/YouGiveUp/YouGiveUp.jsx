import "./YouGiveUp.scss";
import { Link } from 'react-router-dom';

const YouGiveUp = ({ handleClickedHome, handleNext }) => {

  return (
    <div className="youGiveUp">

      <div className="youGiveUp__container">

        <h1 className="youGiveUp__heading">You Give Up!</h1>

        <p className="youGiveUp__instructions">
          Keep trying! Maybe you'll get it next time.
        </p>

        <div className="youGiveUp__button-container">

          <Link className="button--home" 
            onClick={handleClickedHome}
             >
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