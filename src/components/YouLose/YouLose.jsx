import "./YouLose.scss";
import Button from "../Button/Button";

const YouLose = ({ handleNext }) => {
  
  return (

    <div className="youLose__card">

      <h1 className="youLose__heading">You Lose!</h1>

      <p className="youLose__question">Gab: </p>

      <p className="youLose__answer">Answer: </p>

      <p className="youLose__points">Points Earned: </p>

      <Button 
        text={"Home"}
        path={"/"}
        />

      <Button 
        text={"Next"}
        onClick={handleNext}
      />

    </div>

  )};

export default YouLose;