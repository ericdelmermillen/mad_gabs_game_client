import "./YouLose.scss";
import { Link } from 'react-router-dom';

const YouLose = ({ handleNext }) => {
  
  return (

    <div className="youLose">
      <div className="youLose__container">

      <h1 className="youLose__heading">You Lose!</h1>

      <p className="youGiveUp__instructions">
        Sorry about your luck.
      </p>

      <p className="youGiveUp__instructions">
        Keep trying and maybe you'll get it next time around.
      </p>


      <div className="youLose button__container">

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
    </div>

  )};

export default YouLose;