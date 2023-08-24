import "./YouWin.scss";

const YouWin = ({currentGab}) => {
  const [currentGabQuestion, currentGabAnswer] = currentGab;

  console.log(currentGabQuestion)
  console.log(currentGabAnswer)
  return (
    <div className="youWin__card">

      <h1 className="youWin__heading">You Win!</h1>
      <p className="youWin__question">Gab: "{`${currentGabQuestion.join(" ")}`}"</p>
      <p className="youWin__answer">Answer: "

        {
          currentGabAnswer.map((word, index) =>
          <span className="youWin__answer--word" key={index}>{word.slice(0, 1).toUpperCase() + word.slice(1)}</span>)
        }"
      </p>

    </div>
  )};

export default YouWin;