import "./HowToPlay.scss"

const HowToPlay = ({setShowHowToPlay, showHowToPlay}) => {
  
  return (

  <div className="howToPlay">

    <div className="howToPlay__container">

    <h1 className="howToPlay__heading">How To Play Mad Gabs</h1>
      <p className="howToPlay__instructions">
        Mad Gabs is a game where you speak a phrase to uncover a hidden answer.
      </p>

      <p className="howToPlay__instructions">
        To win, speak clearly so the microphone can detect the secret words.
      </p>

      <p className="howToPlay__instructions">
        If you're stuck, try different ways of saying the phrase until the answer is revealed or time runs out.
      </p>


      <div className="howToPlay button__container">


        <span className="button--home" 
          onClick={() => setShowHowToPlay(!showHowToPlay)}>
          Got it!
        </span>

      </div>

    </div>

  </div>

)};

export default HowToPlay;
