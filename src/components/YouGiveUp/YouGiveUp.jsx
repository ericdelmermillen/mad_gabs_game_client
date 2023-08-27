import "./YouGiveUp.scss";
import Button from "../Button/Button";

const YouGiveUp = ({ handleNext }) => {
  return (
    <div className="youGiveUp__card">

      <h1 className="youGiveUp__heading">You Give Up!</h1>

      <p className="youGiveUp__question">Gab: </p>

      <p className="youGiveUp__answer">Answer: </p>

      <p className="youGiveUp__points">Points Earned: </p>


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

export default YouGiveUp;
