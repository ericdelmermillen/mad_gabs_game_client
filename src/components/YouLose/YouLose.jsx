import "./YouLose.scss";
import { Link } from 'react-router-dom';

const YouLose = ({ handleNext, setLevel }) => {
  
  return (

    <div className="youLose">
      <div className="youLose__container">

      <h1 className="youLose__heading">You Lose!</h1>

      <p className="youGiveUp__instructions">
        Sorry about your luck.
      </p>

      <p className="youGiveUp__instructions">
        Maybe you'll get it next time.
      </p>

      <div className="youLose button__container">

        <Link className="button--home" 
          onClick={setLevel}
          to={"/"} >
          Home
        </Link>

        <Link className="button--next"
          onClick={handleNext} >
          Next
        </Link>

      </div>

      </div>
    </div>

  )};

export default YouLose;