import "./YouLose.scss";
import { Link } from 'react-router-dom';

const YouLose = ({ handleNext }) => {
  
  return (

    <div className="youLose__card">

      <h1 className="youLose__heading">You Lose!</h1>
{/* 
      <p className="youLose__question">Gab: </p>

      <p className="youLose__answer">Answer: </p>

      <p className="youLose__points">Points Earned: </p> */}


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

export default YouLose;